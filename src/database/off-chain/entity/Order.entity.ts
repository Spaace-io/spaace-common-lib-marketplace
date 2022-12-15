import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'orders' })
export class Order extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column({ nullable: true })
    item!: string;

    @Field()
    @Column()
    isAsk!: boolean;

    @Field()
    @Column()
    price!: number;

    @Field()
    @Column()
    currency!: string;

    @Field()
    @Column()
    endTime!: string;

    @Field()
    @Column()
    startTime!: string;

    @Field()
    @Column()
    collection!: string;

    @Field()
    @Column()
    hash!: string;

    @Field()
    @Column()
    signer!: string;

    @Field()
    @Column()
    signature!: string;

    @Field()
    @Column()
    strategy!: string;

    @Field()
    @Column()
    tokenId!: string;

    @Field()
    @Column()
    created_at!: Date;

    @Field()
    @Column()
    updated_at!: Date;

}
