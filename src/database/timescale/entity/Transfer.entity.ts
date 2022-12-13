import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'transfers' })
export class Transfer extends BaseEntity {
    @PrimaryColumn()
    hash!: string;

    @Column()
    from!: string;

    @Column()
    to!: string;

    @Column()
    collection!: string;

    @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // max uint256 = 78 digits
    item!: string;

    @Column('numeric', { precision: 78, unsigned: true, nullable: true })
    amount!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
