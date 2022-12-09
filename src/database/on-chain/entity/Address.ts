import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm';
import {Collection} from "./Collection";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @OneToMany(() => Collection, (collection) => collection.deployedOwner)
    @JoinColumn({ name: 'fk_collection_id' })
    collections!: Collection[];
}
