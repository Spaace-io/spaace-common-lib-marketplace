import { BaseEntity } from 'typeorm';
import { Collection } from './Collection.entity';
import { Event } from '../../..';
export declare class ItemAttribute {
    trait: string;
    type: string;
}
export declare class ItemMedia {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class Item extends BaseEntity {
    collection: Collection;
    tokenId: string;
    title?: string;
    description?: string;
    tokenUri?: string;
    attributes?: object[];
    medias?: object[];
    events?: typeof Event[];
}
