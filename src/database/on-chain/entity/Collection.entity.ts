import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './Item.entity';

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

    @Field()
    count!: string;

}

@ObjectType()
export class CollectionVolume {

    @Field()
    volume24h!: number;

    @Field()
    change24h!: number;

    @Field()
    volume7d!: number;

    @Field()
    change7d!: number;

    @Field()
    volume30d!: number;

    @Field()
    change30d!: number;

    @Field()
    volume!: number;

}

@ObjectType()
export class CollectionFloor {

    @Field()
    floorPrice!: number;

    @Field()
    floorChange24h!: number;

    @Field()
    floorChange7d!: number;

    @Field()
    floorChange30d!: number;

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
    @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // 78 digits = Maximum uint256 value
    totalSupply?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deployedAt?: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    deployer?: string;

    @Field(() => [Item], { nullable: true })
    @OneToMany(() => Item, (item) => item.collection)
    items?: Item[];

    // DB only columns

    @Column('jsonb', { nullable: true })
    abi?: object[];

    // GraphQL only fields

    @Field(() => [CollectionAttribute], { nullable: true })
    attributes?: CollectionAttribute[];

    @Field({ nullable: true })
    highestOffer?: string;

    @Field({ nullable: true })
    ownerCount?: string;

    @Field({ nullable: true })
    volume?: CollectionVolume;

    @Field({ nullable: true })
    floor?: CollectionFloor;

}
