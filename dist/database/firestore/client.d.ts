import { Firestore } from '@google-cloud/firestore';
import { Season } from './types';
declare class FirestoreClient {
    readonly store: Firestore;
    constructor();
    private createInitialSeason;
    initialize(): Promise<void>;
    getSeasonByNumber(number: number): Promise<Season | null>;
}
declare const _default: FirestoreClient;
export default _default;
