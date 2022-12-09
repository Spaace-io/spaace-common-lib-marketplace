import { BaseEntity } from 'typeorm';
import { Item } from './Item.entity';
export declare class CollectionAttribute {
    trait: string;
    type: string;
    count: string;
}
export declare class CollectionAttributes {
    attributes: CollectionAttribute[];
}
export declare class Collection extends BaseEntity {
    id: string;
    items: Item[];
    deployedOwner: string;
    name: string;
    countOwner: string;
    symbol: string;
    totalSupply: number;
    tokenType: string;
    abi: object[];
    imageUrl: string;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl: string;
    description: string;
    highOffer: string;
    created_at: Date;
    updated_at: Date;
}
