import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Collection {

    @PrimaryColumn()
    hash!: string;

}
