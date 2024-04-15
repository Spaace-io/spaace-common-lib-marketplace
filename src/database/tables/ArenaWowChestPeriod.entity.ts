import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_wow_chest_period' })
export class ArenaWowChestPeriod extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  startTime!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  numberOfChest!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  starsThreshold!: number;
}
