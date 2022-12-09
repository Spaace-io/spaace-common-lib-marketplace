import { Collection } from './Collection.entity';
export declare class Medias {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class Item {
    id: string;
    collection: Collection;
    title: string;
    description: string;
    tokenId: string;
    isRefreshed: boolean;
    lastTimeUpdate: Date;
    tokenUri: string;
    attributes: object[] | JSON;
    medias: object[] | JSON;
    created_at: Date;
    updated_at: Date;
}
