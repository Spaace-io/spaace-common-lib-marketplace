import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Season } from '.';

export enum SeasonChapterKey {
  PRE_RESET = 'PRE_RESET',
  FINAL_CHAPTER = 'FINAL_CHAPTER',
  POST_FINAL_CHAPTER = 'POST_FINAL_CHAPTER',
  MANUAL_RESET = 'MANUAL_RESET',
}

registerEnumType(SeasonChapterKey, {
  name: 'SeasonChapterKey',
});

@ObjectType()
@Entity({ name: 'season_chapters' })
@Index(['seasonNumber', 'key'], { unique: true })
@Index(['seasonNumber', 'startAt'])
export class SeasonChapter extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => SeasonChapterKey)
  @Column('enum', {
    enum: SeasonChapterKey,
    enumName: 'season_chapter_key',
  })
  key!: SeasonChapterKey;

  @Field(() => Date)
  @Column('timestamp without time zone')
  startAt!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
