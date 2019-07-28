import * as athenaClient from 'athena-client';

export const client = athenaClient.createClient(
  { bucketUri: `s3://${process.env.ATHENA_BUCKET_NAME}` },
  { region: 'eu-west-1' }
);
