import { BaseEntity } from 'typeorm';
export declare enum CollectionType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
export declare enum CollectionLinkType {
    CUSTOM = "CUSTOM",
    TWITTER = "TWITTER",
    DISCORD = "DISCORD",
    INSTAGRAM = "INSTAGRAM",
    TELEGRAM = "TELEGRAM",
    MEDIUM = "MEDIUM"
}
export declare class CollectionLink {
    type: CollectionLinkType;
    url: string;
}
export declare class CollectionEntity extends BaseEntity {
    address: string;
    type: CollectionType;
    name: string | null;
    symbol: string | null;
    imageUrl: string | null;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl: string | null;
    description: string | null;
    deployedAt: Date | null;
    deployer: string | null;
    links: CollectionLink[];
    lastImport: Date | null;
    openseaVerificationStatus: string | null;
    openseaVerifiedCheckedAt: Date | null;
}
