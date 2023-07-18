import { PubSubTrigger } from './types/trigger';
import { QuestTrigger } from '../database';
declare class PubSubClient {
    private readonly pubsub;
    constructor();
    initialize(): Promise<void>;
    private createTopics;
    private subscribe;
    trigger(...messages: PubSubTrigger<QuestTrigger>[]): Promise<string[]>;
    onTrigger(name: string, listener: (trigger: PubSubTrigger<QuestTrigger>) => Promise<void>): Promise<void>;
}
export declare const pubsub: PubSubClient;
export {};
