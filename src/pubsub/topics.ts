export enum PubsubTopic {
  // Kept for backwards compatibility
  TRIGGERS = 'triggers',
  // New one for metadata import
  METADATA_IMPORT_TRIGGERS = 'metadata-import-triggers',
}

export const PUBSUB_TOPICS = Object.entries(PubsubTopic).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: `${key}-${process.env.TESTNET ? 'goerli' : 'ethereum'}`,
  }),
  {} as Record<PubsubTopic, string>,
);
