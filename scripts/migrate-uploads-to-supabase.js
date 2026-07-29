'use strict';

const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');

const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

async function migrateFile(strapi, fileRecord) {
  const provider = strapi.plugin('upload').provider;

  const variants = [{ key: 'main', hash: fileRecord.hash, ext: fileRecord.ext, mime: fileRecord.mime }];
  const formats = fileRecord.formats || null;
  if (formats) {
    for (const [formatKey, format] of Object.entries(formats)) {
      variants.push({ key: formatKey, hash: format.hash, ext: format.ext, mime: format.mime });
    }
  }

  const newFormats = formats ? JSON.parse(JSON.stringify(formats)) : formats;
  let newUrl = fileRecord.url;

  for (const variant of variants) {
    const localPath = path.join(UPLOADS_DIR, `${variant.hash}${variant.ext}`);

    if (!(await fs.pathExists(localPath))) {
      console.warn(`  [skip] missing local file for ${variant.key}: ${localPath}`);
      continue;
    }

    const fileToUpload = {
      hash: variant.hash,
      ext: variant.ext,
      mime: variant.mime,
      stream: fs.createReadStream(localPath),
    };

    await provider.uploadStream(fileToUpload);

    if (variant.key === 'main') {
      newUrl = fileToUpload.url;
    } else {
      newFormats[variant.key].url = fileToUpload.url;
    }
  }

  await strapi.db.query('plugin::upload.file').update({
    where: { id: fileRecord.id },
    data: {
      provider: 'aws-s3',
      url: newUrl,
      formats: newFormats,
    },
  });

  console.log(`  [ok] ${fileRecord.hash}${fileRecord.ext} -> ${newUrl}`);
}

async function migrateOrphanFiles(strapi, referencedFilenames) {
  const provider = strapi.plugin('upload').provider;
  const allFiles = await fs.readdir(UPLOADS_DIR);
  const orphanFiles = allFiles.filter((name) => name !== '.gitkeep' && !referencedFilenames.has(name));

  console.log(
    `\nFound ${orphanFiles.length} local file(s) not referenced by any DB record. Uploading them as-is (no DB rows to update for these)...`
  );

  for (const name of orphanFiles) {
    const ext = path.extname(name);
    const hash = path.basename(name, ext);
    const localPath = path.join(UPLOADS_DIR, name);
    const fileMime = mime.lookup(ext) || 'application/octet-stream';

    const fileToUpload = { hash, ext, mime: fileMime, stream: fs.createReadStream(localPath) };
    try {
      await provider.uploadStream(fileToUpload);
      console.log(`  [ok] ${name} -> ${fileToUpload.url}`);
    } catch (error) {
      console.warn(`  [fail] ${name}: ${error.message}`);
    }
  }
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  try {
    const files = await app.db.query('plugin::upload.file').findMany({
      where: { provider: 'local' },
    });

    console.log(`Migrating ${files.length} file record(s) from 'local' to 'aws-s3' (Supabase)...\n`);

    const referencedFilenames = new Set();
    for (const file of files) {
      referencedFilenames.add(`${file.hash}${file.ext}`);
      for (const format of Object.values(file.formats || {})) {
        referencedFilenames.add(`${format.hash}${format.ext}`);
      }
    }

    for (const file of files) {
      console.log(`- ${file.name} (id=${file.id})`);
      await migrateFile(app, file);
    }

    await migrateOrphanFiles(app, referencedFilenames);

    console.log('\nDone.');
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
