import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "..";

@ObjectType()
@Entity({ name: 'orders' })
export class Order extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field(() => User)
    @Column(() => User)
    user!: User;

    @Field()
    @Column()
    collection!: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    item?: string;

    @Field()
    @Column()
    isAsk!: boolean;

    @Field()
    @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    price!: string;

    @Field()
    @Column()
    currency!: string;

    @Field()
    @Column()
    startTime!: Date;

    @Field()
    @Column()
    endTime!: Date;

    @Field()
    @Column()
    signature!: string;

}
