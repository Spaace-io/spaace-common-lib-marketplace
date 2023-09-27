export enum PubsubTopic {
  // Kept for backwards compatibility
  TRIGGERS = 'triggers',
  // New one for metadata import
  METADATA_IMPORT = 'metadata-import',
}

export const PUBSUB_TOPICS = Object.fromEntries(
  Object.values(PubsubTopic).map((value) => [
    value,
    `${value}-${process.env.ENVIRONMENT}`,
  ]),
);
