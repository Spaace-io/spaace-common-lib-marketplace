import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'transfers' })
export class Transfer extends BaseEntity {
    @PrimaryColumn('char', { length: 64 })
    txHash!: string;
    @PrimaryColumn()
    logIdx!: number;

    @Column('char', { length: 40 })
    from!: string;
    @Column('char', { length: 40 })
    to!: string;

    @Column('char', { length: 40 })
    collection!: string;
    @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // max uint256 = 78 digits
    item!: string;

    @Column('numeric', { precision: 78, unsigned: true, nullable: true })
    amount!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
