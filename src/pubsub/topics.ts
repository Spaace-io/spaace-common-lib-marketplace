export enum PubsubTopic {
  // Kept for backwards compatibility
  Triggers = 'triggers',
  // New one for metadata import
  MetadataImportTrigger = 'metadata-import-trigger',
}

export const PUBSUB_TOPICS = Object.entries(PubsubTopic).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: `${key}-${process.env.TESTNET ? 'goerli' : 'ethereum'}`,
  }),
  {} as Record<PubsubTopic, string>,
);
