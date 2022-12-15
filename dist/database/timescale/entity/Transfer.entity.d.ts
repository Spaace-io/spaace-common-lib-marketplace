import { Event } from '../../../graphql/Event';
export declare class Transfer extends Event {
    txHash: string;
    logIdx: number;
    from: string;
    to: string;
    collection: string;
    item: string;
    amount: string;
}
