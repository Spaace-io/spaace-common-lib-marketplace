import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Quest } from './Quest.entity';

@ObjectType()
export class SpotlightHistoryEntry {
  @Field(() => String)
  collectionAddress!: string;

  @Field(() => String)
  seasonNumber!: string;

  @Field(() => String)
  validFrom!: string;

  @Field(() => String)
  validTo!: string;

  @Field(() => Boolean, { nullable: true })
  deactivatedManually?: boolean | null;

  @Field(() => String, { nullable: true })
  deactivatedAt?: string | null;

  @Field(() => String, { nullable: true })
  note?: string | null;
}

@ObjectType()
@Entity({ name: 'spotlight_campaigns' })
export class SpotlightCampaign extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Field(() => String)
  @Column('text')
  collectionName!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Field(() => String)
  @Column('uuid')
  questId!: string;

  @Field(() => Quest)
  @ManyToOne(() => Quest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  quest!: Quest;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validFrom!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validTo!: Date;

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  active!: boolean;

  @Field(() => [SpotlightHistoryEntry])
  @Column('jsonb', { default: () => "'[]'::jsonb" })
  metadata!: SpotlightHistoryEntry[];
}
