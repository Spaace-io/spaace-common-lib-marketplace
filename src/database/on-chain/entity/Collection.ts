import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {Item} from "./Item";
import {Address} from "./Address";


export class CollectionAttribute {

    trait!: string;


    type!: string;


    count!: string;
}

export class CollectionAttributes {
    attributes!: CollectionAttribute[];
}

@Entity({name: 'collections'})
export class Collection {
    @PrimaryColumn()
    id!: string;

    @OneToMany(() => Item, (item) => item.collection)
    items!: Item[];

    @ManyToOne(() => Address, (owner) => owner.collections)
    deployedOwner!: Address;

    @Column({nullable: true})
    name!: string;

    @Column({nullable: true})
    countOwner!: string;

    @Column({nullable: true})
    symbol!: string;

    @Column({nullable: true})
    totalSupply!: number;

    @Column({nullable: true})
    tokenType!: string;

    @Column('jsonb', {nullable: true})
    abi!: object[];

    @Column({nullable: true})
    imageUrl!: string;

    @Column({default: true})
    active!: boolean;

    @Column({default: false})
    verified!: boolean;

    @Column({default: false})
    explicit!: boolean;

    @Column({nullable: true})
    bannerUrl!: string;

    @Column({nullable: true})
    description!: string;

    @Column({nullable: true})
    highOffer!: string;

    @Column({default: () => 'CURRENT_TIMESTAMP', nullable: true})
    created_at!: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP', nullable: true})
    updated_at!: Date;
}
