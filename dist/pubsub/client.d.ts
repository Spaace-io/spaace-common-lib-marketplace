import { MetadataImportTrigger, PubSubTrigger } from './types/trigger';
import { PubsubTopic, QuestTrigger } from '..';
declare class PubSubClient {
    private readonly pubsub;
    constructor();
    initialize(): Promise<void>;
    private createTopics;
    private getTopicFromName;
    private subscribe;
    publish(topicName: PubsubTopic, ...messages: PubSubTrigger<QuestTrigger | MetadataImportTrigger>[]): Promise<string[]>;
    onTrigger(name: string, topicName: PubsubTopic, listener: (trigger: PubSubTrigger<QuestTrigger | MetadataImportTrigger>) => Promise<void>): Promise<void>;
}
export declare const pubsub: PubSubClient;
export {};
