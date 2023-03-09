import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { User } from '../off-chain';
import { Season } from './types';
declare class FirestoreClient {
    private readonly store;
    readonly seasons: CollectionReference<DocumentData>;
    readonly quests: CollectionReference<DocumentData>;
    constructor();
    /**
     * Initialize the Firestore client
     * Create initial season and quests if not exists
     */
    initialize(): Promise<void>;
    /**
     * Create initial season and quests if not exists
     */
    private createInitialSeason;
    /**
     * Create initial quests
     * @param season Season reference
     */
    private createInitialQuests;
    /**
     * Get season by season number
     * @param number Season number
     * @returns Season or null if not found
     */
    getSeasonByNumber(number: number): Promise<Season | null>;
    /**
     * Retrieve current season
     * @returns Current season or null if not found
     */
    getCurrentSeason(): Promise<Season | null>;
    /**
     * Get user by address
     * @param address The user address
     * @returns User or null if not found
     */
    getUser(address: string): Promise<User | null>;
    /**
     * Create user if not exists
     * @param address The user address
     */
    createUser(address: string): Promise<void>;
}
declare const _default: FirestoreClient;
export default _default;
