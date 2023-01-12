import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

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
    @PrimaryColumn('char', { length: 40 })
    collection!: string;

    @Field()
    @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
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
    @Column('char', { length: 40 })
    currency!: string;

    @Field()
    @PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
    @Index('sales_timestamp_idx') // Required for TimescaleDB's create_hypertable
    timestamp!: Date;

}
