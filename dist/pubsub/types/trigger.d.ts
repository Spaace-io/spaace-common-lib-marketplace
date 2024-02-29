import { QuestTrigger, ArenaQuestTrigger } from '../../database';
import { PubSubTopic, ArenaPubSubTopic } from './topic';
export declare enum CollectionImportRequest {
    COLLECTIONS = "COLLECTIONS",
    ITEMS = "ITEMS"
}
export declare enum SearchIndexType {
    ITEM = "ITEM",
    COLLECTION = "COLLECTION",
    USER = "USER"
}
export type PubSubTrigger<T extends PubSubTopic> = T extends PubSubTopic.TRIGGERS ? QuestTrigger : T extends PubSubTopic.COLLECTION_IMPORT ? CollectionImportRequest : T extends PubSubTopic.SEARCH_INDEX ? SearchIndexType : never;
export type ArenaPubSubTrigger<T extends ArenaPubSubTopic> = T extends ArenaPubSubTopic.TRIGGERS ? ArenaQuestTrigger : never;
