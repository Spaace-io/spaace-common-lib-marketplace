import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "..";

@ObjectType()
@Entity({ name: 'orders' })
export class Order extends BaseEntity {

    @Field()
    @PrimaryColumn('char', { length: 64 })
    orderHash!: string;

    @Field()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user', referencedColumnName: 'address' })
    user!: string;

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
