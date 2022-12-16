import { BaseEntity, Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'latest_block' })
export class LatestBlock extends BaseEntity {

    @PrimaryColumn({ default: true })
    @Check('pk = TRUE')
    pk!: boolean;

    @Column()
    number!: number;

    @Column('char', { length: 64 })
    hash!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;

}