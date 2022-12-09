import { Collection } from "./Collection";
export declare class Medias {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class Item {
    id: string;
    title: string;
    description: string;
    tokenId: string | null;
    isRefreshed: boolean;
    lastTimeUpdate: Date;
    tokenUri: string;
    attributes: object[] | JSON;
    medias: object[] | JSON;
    created_at: Date;
    updated_at: Date;
    collection: Collection;
}
