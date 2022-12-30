import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Item } from "./Item.entity";

@ObjectType()
@Entity({ name: 'sales' })
export class Sale extends BaseEntity {

    @Field()
    @PrimaryColumn('char', { length: 64 })
    txHash!: string;

    @Field()
    @PrimaryColumn()
    logIdx!: number;

    @Field()
    @Column('char', { length: 64 })
    orderHash!: string;

    @Field()
    @ManyToOne(() => Item)
    @JoinColumn([
        { name: 'collection', referencedColumnName: 'collection' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ])
    collection!: string;
    @Field()
    tokenId!: string;

    @Field()
    @Column('numeric', { precision: 78, unsigned: true, default: '1' })
    amount!: string;

    @Field()
    @Column('char', { length: 40 })
    from!: string;

    @Field()
    @Column('char', { length: 40 })
    to!: string;

    @Field()
    @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    price!: string;

    @Field()
    @Column()
    currency!: string;

    @Field()
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;

}
