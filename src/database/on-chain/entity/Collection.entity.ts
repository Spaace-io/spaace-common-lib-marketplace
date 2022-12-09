import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import { Item } from './Item.entity';

export class CollectionAttribute {
    trait!: string;

    type!: string;

    count!: string;
}

export class CollectionAttributes {
    attributes!: CollectionAttribute[];
}

@Entity({ name: "collections" })
export class Collection extends BaseEntity{
    @PrimaryColumn()
    id!: string;

    @OneToMany(() => Item, (item) => item.collection)
    items!: Item[];

    @Column({ nullable: true })
    deployedOwner!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    countOwner!: string;

    @Column({ nullable: true })
    symbol!: string;

    @Column({ nullable: true })
    totalSupply!: number;

    @Column({ nullable: true })
    tokenType!: string;

    @Column('jsonb', { nullable: true })
    abi!: object[];

    @Column({ nullable: true })
    imageUrl!: string;

    @Column({ default: true })
    active!: boolean;

    @Column({ default: false })
    verified!: boolean;

    @Column({ default: false })
    explicit!: boolean;

    @Column({ nullable: true })
    bannerUrl!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    highOffer!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}