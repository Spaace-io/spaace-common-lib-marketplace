import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Primary key = (txHash, logIdx, from, to, collection, item, timestamp)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)
// Timestamp is required to be in all unique keys, including the primary one, by TimescaleDB

@ObjectType()
@Entity({ name: 'transfers' })
export class Transfer extends BaseEntity {

    @Field()
    @PrimaryColumn('char', { length: 64 })
    txHash!: string;

    @Field()
    @PrimaryColumn()
    logIdx!: number;

    @Field()
    @PrimaryColumn('char', { length: 40 })
    from!: string;

    @Field()
    @PrimaryColumn('char', { length: 40 })
    to!: string;

    @Field()
    @PrimaryColumn('char', { length: 40 })
    collection!: string;

    @Field()
    @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    item!: string;

    @Field()
    @Column('numeric', { precision: 78, unsigned: true, default: '1' })
    amount!: string;

    @Field()
    @PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;

}
