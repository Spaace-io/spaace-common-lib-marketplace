export enum PubsubTopic {
  // Kept for backwards compatibility
  TRIGGERS = 'triggers',
  // New one for metadata import
  METADATA_IMPORT = 'metadata-import',
}

export const PUBSUB_TOPICS = Object.fromEntries(
  Object.entries(PubsubTopic).map(([k, v]) => [
    k,
    `${v}-${process.env.ENVIRONMENT}`,
  ]),
);
