import { MetadataImportTrigger, PubSubTrigger } from './types/trigger';
import { PubsubTopic, QuestTrigger } from '..';
declare class PubSubClient {
    private readonly pubsub;
    constructor();
    initialize(): Promise<void>;
    private createTopics;
    private getTopicFromName;
    private subscribe;
    publish<T extends PubsubTopic>(topicName: T, ...messages: PubSubTrigger<T extends PubsubTopic.TRIGGERS ? QuestTrigger : T extends PubsubTopic.METADATA_IMPORT ? MetadataImportTrigger : never>[]): Promise<string[]>;
    onTrigger<T extends PubsubTopic>(name: string, topicName: T, listener: (trigger: PubSubTrigger<T extends PubsubTopic.TRIGGERS ? QuestTrigger : T extends PubsubTopic.METADATA_IMPORT ? MetadataImportTrigger : never>) => Promise<void>): Promise<void>;
}
export declare const pubsub: PubSubClient;
export {};
