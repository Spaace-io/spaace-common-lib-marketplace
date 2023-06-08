import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'notable_collections' })
export class NotableCollection extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  collection!: string;
}
