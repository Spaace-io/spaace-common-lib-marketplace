import { Column } from 'typeorm';
import { PaginationNode } from './PaginationNode';

export abstract class Event extends PaginationNode {
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date;
}
