import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('SUPABASE_STORAGE_PUBLIC_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('SUPABASE_STORAGE_ACCESS_KEY'),
            secretAccessKey: env('SUPABASE_STORAGE_SECRET_ACCESS_KEY'),
          },
          endpoint: env('SUPABASE_STORAGE_ENDPOINT'),
          region: env('SUPABASE_STORAGE_REGION'),
          forcePathStyle: true,
          params: {
            Bucket: env('SUPABASE_STORAGE_BUCKET'),
            // Supabase's S3-compatible layer doesn't support object ACLs (like Cloudflare R2);
            // omitting this prevents the provider from defaulting to ACL: 'public-read'.
            ACL: undefined,
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes: deniedExecutableTypes,
      },
    },
  },
});

export default config;
