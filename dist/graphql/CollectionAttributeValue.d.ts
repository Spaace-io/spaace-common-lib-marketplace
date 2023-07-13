import { Order } from '..';
export declare class CollectionAttributeValue {
    collectionAddress: string;
    trait: string;
    value: string;
    count: string;
    buyNow?: Order | null;
    sellNow?: Order | null;
}
