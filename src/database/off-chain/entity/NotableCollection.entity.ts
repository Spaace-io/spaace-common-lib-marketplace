import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'notable_collections' })
export class NotableCollection extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;
}
