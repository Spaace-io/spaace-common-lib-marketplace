import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends  BaseEntity {

    @PrimaryColumn('char', { length: 40 })
    address!: number;

}
