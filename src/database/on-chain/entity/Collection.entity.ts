import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Item } from './Item.entity';

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
    id!: string;

    @OneToMany(() => Item, (item) => item.collection)
    items!: Item[];

    @Field()
    @Column({ nullable: true })
    deployedOwner!: string;

    @Field()
    @Column({ nullable: true })
    name!: string;

    @Field()
    @Column({ nullable: true })
    countOwner!: string;

    @Field()
    @Column({ nullable: true })
    symbol!: string;

    @Field()
    @Column({ nullable: true })
    totalSupply!: number;

    @Field()
    @Column({ nullable: true })
    tokenType!: string;

    @Column('jsonb', { nullable: true })
    abi!: object[];

    @Field()
    @Column({ nullable: true })
    imageUrl!: string;

    @Field()
    @Column({ default: true })
    active!: boolean;

    @Field()
    @Column({ default: false })
    verified!: boolean;

    @Field()
    @Column({ default: false })
    explicit!: boolean;

    @Field()
    @Column({ nullable: true })
    bannerUrl!: string;

    @Field()
    @Column({ nullable: true })
    description!: string;

    @Field()
    @Column({ nullable: true })
    highOffer!: string;

    @Field(() => [CollectionAttribute])
    attributes!: CollectionAttribute[];

    @Field()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Field()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @Field()
    volume!: CollectionVolume;

    @Field()
    floor!: CollectionFloor;

}
