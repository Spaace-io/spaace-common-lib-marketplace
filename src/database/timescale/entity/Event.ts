import { BaseEntity, Column } from 'typeorm';

export abstract class Event extends BaseEntity {
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
