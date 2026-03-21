import { ScalekitClient } from '@scalekit-sdk/node';

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Check .env.local and ensure Next.js is loading it.`);
  }
  return value;
}

const environmentUrl = getRequiredEnv('SCALEKIT_ENVIRONMENT_URL');
try {
  new URL(environmentUrl);
} catch {
  throw new Error(`SCALEKIT_ENVIRONMENT_URL is not a valid URL: ${environmentUrl}`);
}
const clientId = getRequiredEnv('SCALEKIT_CLIENT_ID');
const clientSecret = getRequiredEnv('SCALEKIT_CLIENT_SECRET');

export const scalekit = new ScalekitClient(environmentUrl, clientId, clientSecret);
