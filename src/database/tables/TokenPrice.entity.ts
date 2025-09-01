import { Entity, Index, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, GraphQLISODateTime } from '@nestjs/graphql';

@Entity('token_prices')
@Index(['symbol', 'vsCurrency', 'bucketedAt'], { unique: true })
export class TokenPriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 32 })
  symbol: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 16 })
  vsCurrency: string;

  @Field(() => String)
  @Column({ type: 'numeric', precision: 36, scale: 18 })
  price: string;

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamptz' })
  bucketedAt: Date;

  @Field(() => GraphQLISODateTime)
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  fetchedAt: Date;
}
