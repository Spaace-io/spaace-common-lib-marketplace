import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {

    @Field()
    @PrimaryColumn('char', { length: 40 })
    address!: number;

}
