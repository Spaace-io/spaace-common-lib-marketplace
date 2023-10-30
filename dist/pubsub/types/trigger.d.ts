import { QuestTrigger } from '../../database';
import { PubSubTopic } from './topic';
export declare enum CollectionImportRequest {
    ITEM = "ITEM",
    COLLECTION = "COLLECTION"
}
export declare enum SearchIndexType {
    ITEM = "ITEM",
    COLLECTION = "COLLECTION"
}
export type PubSubTrigger<T extends PubSubTopic> = T extends PubSubTopic.TRIGGERS ? QuestTrigger : T extends PubSubTopic.COLLECTION_IMPORT ? CollectionImportRequest : T extends PubSubTopic.SEARCH_INDEX ? SearchIndexType : never;
