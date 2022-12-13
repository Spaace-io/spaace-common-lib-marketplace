import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'blocks' })
export class Block extends BaseEntity {
    @PrimaryColumn({ unique: true })
    number!: number;
    @Column('char', { length: 64 })
    hash!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
