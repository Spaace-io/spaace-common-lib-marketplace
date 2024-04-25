import { PubSubTopic } from '../../types';

export const exchangeMap = {
  [PubSubTopic.TRIGGERS]: 'triggers-exchange',
  [PubSubTopic.DELAYED_TRIGGERS]: 'delayed-triggers-exchange',
  [PubSubTopic.COLLECTION_IMPORT]: 'collection-import-exchange',
  [PubSubTopic.SEARCH_INDEX]: 'search-index-exchange',
};
