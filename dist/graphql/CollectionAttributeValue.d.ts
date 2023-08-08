import { Order, Sale } from '..';
export declare class CollectionAttributeValue {
    collectionAddress: string;
    trait: string;
    value: string;
    count: string;
    listedCount?: string;
    buyNow?: Order | null;
    sellNow?: Order | null;
    lastSale?: Sale | null;
}
