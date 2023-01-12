import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Order } from '../..';

export enum CollectionType {
    ERC721 = 'ERC721',
    ERC1155 = 'ERC1155',
}

registerEnumType(CollectionType, {
    name: 'CollectionType',
});

@ObjectType()
export class CollectionAttribute {

    @Field()
    trait!: string;

    @Field()
    type!: string;

    @Field(() => Int)
    count!: number;

}

@ObjectType()
export class CollectionVolume {

    @Field()
    volume24h!: string;

    @Field()
    change24h!: string;

    @Field()
    volume7d!: string;

    @Field()
    change7d!: string;

    @Field()
    volume30d!: string;

    @Field()
    change30d!: string;

    @Field()
    volume!: string;

}

@ObjectType()
export class CollectionFloor {

    @Field()
    floorPrice!: string;

    @Field()
    floorChange24h!: string;

    @Field()
    floorChange7d!: string;

    @Field()
    floorChange30d!: string;

}

@ObjectType()
@Entity({ name: 'collections' })
export class Collection extends BaseEntity {

    @Field()
    @PrimaryColumn()
    address!: string;

    @Field(() => CollectionType)
    @Column('enum', { enum: CollectionType, enumName: 'collection_type' })
    type!: CollectionType;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    symbol?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    imageUrl?: string;

    @Field()
    @Column({ default: true })
    active!: boolean;

    @Field()
    @Column({ default: false })
    verified!: boolean;

    @Field()
    @Column({ default: false })
    explicit!: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    bannerUrl?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deployedAt?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deployer?: string;

    @Field(() => [CollectionAttribute], { nullable: true })
    @Column('jsonb', { nullable: true })
    attributes?: CollectionAttribute[];

    @Field()
    @Column({ default: false })
    importItems!: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastImport?: Date;

    // GraphQL only fields

    @Field({ nullable: true })
    totalSupply?: string;

    @Field(() => Int, { nullable: true })
    ownerCount?: number;

    @Field(() => Order, { nullable: true })
    buyNow?: Order;

    @Field(() => Order, { nullable: true })
    sellNow?: Order;

    @Field({ nullable: true })
    volume?: CollectionVolume;

    @Field({ nullable: true })
    floor?: CollectionFloor;

}
