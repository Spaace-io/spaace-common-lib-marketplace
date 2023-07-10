import { Timestamp } from '@google-cloud/firestore';
import { Season } from './entity';
declare class FirestoreClient {
    private readonly firestore;
    constructor();
    initialize(): Promise<void>;
    getSeason(number: number): Promise<Season | null>;
    getCurrentSeason(now?: Timestamp): Promise<Season | null>;
}
declare const _default: FirestoreClient;
export default _default;
