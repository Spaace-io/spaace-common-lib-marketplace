import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_admins' })
export class ArenaAdmin extends BaseEntity {
  @Field(() => String)
  @Column('text')
  twitterUsername!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  twitterId!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  twitterPicture!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  accountCreationDate!: Date;

  @Field(() => String)
  @Column('text', { unique: true })
  twitterSecretToken!: string;

  @Field(() => String)
  @Column('text', { unique: true })
  twitterAccessToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  walletAddress: string | undefined;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  tweetLikePaginationToken!: string | null;
}
