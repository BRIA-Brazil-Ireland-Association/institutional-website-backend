const fs = require('node:fs');
const path = require('node:path');

const pluginServerPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'strapi-plugin-ai-sdk',
  'dist',
  'server',
  'index.js'
);

if (!fs.existsSync(pluginServerPath)) {
  console.warn('[patch-ai-sdk-openai] strapi-plugin-ai-sdk server build not found, skipping');
  process.exit(0);
}

let source = fs.readFileSync(pluginServerPath, 'utf8');

const anthropicImport = 'const anthropic = require("@ai-sdk/anthropic");';
const openaiImport = 'const openai = require("@ai-sdk/openai");';

if (!source.includes(openaiImport)) {
  if (!source.includes(anthropicImport)) {
    throw new Error('[patch-ai-sdk-openai] Could not find Anthropic import in strapi-plugin-ai-sdk');
  }

  source = source.replace(anthropicImport, `${anthropicImport}\n${openaiImport}`);
}

const anthropicProviderRegistration = `  AIProvider.registerProvider("anthropic", ({ apiKey, baseURL }) => {
    const provider = anthropic.createAnthropic({ apiKey, baseURL });
    return (modelId) => provider(modelId);
  });`;

const openaiProviderRegistration = `  AIProvider.registerProvider("openai", ({ apiKey, baseURL }) => {
    const provider = openai.createOpenAI({ apiKey, baseURL });
    return (modelId) => provider(modelId);
  });`;

if (!source.includes(openaiProviderRegistration)) {
  if (!source.includes(anthropicProviderRegistration)) {
    throw new Error('[patch-ai-sdk-openai] Could not find provider registration point in strapi-plugin-ai-sdk');
  }

  source = source.replace(
    anthropicProviderRegistration,
    `${anthropicProviderRegistration}\n${openaiProviderRegistration}`
  );
}

fs.writeFileSync(pluginServerPath, source);
console.log('[patch-ai-sdk-openai] OpenAI provider registered in strapi-plugin-ai-sdk');
