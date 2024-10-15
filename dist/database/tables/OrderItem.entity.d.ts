import { BaseEntity } from 'typeorm';
import { ItemEntity, OrderEntity } from '.';
export declare class OrderItemEntity extends BaseEntity {
    hash: string;
    collectionAddress: string;
    tokenId: string | null;
    order: OrderEntity;
    itemEntity: ItemEntity;
}
