import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({nullable: true})
    item!: string;

    @Column()
    isAsk!: boolean;

    @Column()
    price!: number;

    @Column()
    currency!: string;

    @Column()
    endTime!: string;

    @Column()
    startTime!: string;

    @Column()
    collection!: string;

    @Column()
    hash!: string;

    @Column()
    signer!: string;

    @Column()
    signature!: string;

    @Column()
    strategy!: string;

    @Column()
    tokenId!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;
}
