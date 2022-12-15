import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Event } from './Event';

// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)

@Entity({ name: 'transfers' })
export class Transfer extends Event {
    @PrimaryColumn('char', { length: 64 })
    txHash!: string;
    @PrimaryColumn()
    logIdx!: number;

    @PrimaryColumn('char', { length: 40 })
    from!: string;
    @PrimaryColumn('char', { length: 40 })
    to!: string;

    @PrimaryColumn('char', { length: 40 })
    collection!: string;
    @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    item!: string;

    @Column('numeric', { precision: 78, unsigned: true, default: '1' })
    amount!: string;
}
