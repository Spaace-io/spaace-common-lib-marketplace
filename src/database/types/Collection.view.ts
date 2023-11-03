import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  CollectionEntity,
  CollectionLink,
  CollectionType,
  CollectionRankingCached,
  NotableCollection,
} from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(CollectionEntity, 'collection')
      .leftJoin(
        CollectionRankingCached,
        'ranking',
        '"ranking"."address" = "collection"."address"',
      )
      .select('"collection"."address"', 'address')
      .addSelect('"collection"."type"', 'type')
      .addSelect('"collection"."name"', 'name')
      .addSelect('"collection"."symbol"', 'symbol')
      .addSelect('"collection"."imageUrl"', 'imageUrl')
      .addSelect('"collection"."active"', 'active')
      .addSelect('"collection"."verified"', 'verified')
      .addSelect('"collection"."explicit"', 'explicit')
      .addSelect('"collection"."bannerUrl"', 'bannerUrl')
      .addSelect('"collection"."description"', 'description')
      .addSelect('"collection"."deployedAt"', 'deployedAt')
      .addSelect('"collection"."deployer"', 'deployer')
      .addSelect('"collection"."links"', 'links')
      .addSelect('"collection"."lastImport"', 'lastImport')
      .addSelect('COALESCE("ranking"."volume", 0)', 'volume')
      .addSelect('COALESCE("ranking"."volume1h", 0)', 'volume1h')
      .addSelect('COALESCE("ranking"."volume6h", 0)', 'volume6h')
      .addSelect('COALESCE("ranking"."volume24h", 0)', 'volume24h')
      .addSelect('COALESCE("ranking"."volume7d", 0)', 'volume7d')
      .addSelect('COALESCE("ranking"."volume30d", 0)', 'volume30d')
      .addSelect('COALESCE("ranking"."volumeChange1h", 0)', 'volumeChange1h')
      .addSelect('COALESCE("ranking"."volumeChange6h", 0)', 'volumeChange6h')
      .addSelect('COALESCE("ranking"."volumeChange24h", 0)', 'volumeChange24h')
      .addSelect('COALESCE("ranking"."volumeChange7d", 0)', 'volumeChange7d')
      .addSelect('COALESCE("ranking"."volumeChange30d", 0)', 'volumeChange30d')
      .addSelect('COALESCE("ranking"."floorPrice", 0)', 'floorPrice')
      .addSelect('COALESCE("ranking"."floorChange1h", 0)', 'floorChange1h')
      .addSelect('COALESCE("ranking"."floorChange6h", 0)', 'floorChange6h')
      .addSelect('COALESCE("ranking"."floorChange24h", 0)', 'floorChange24h')
      .addSelect('COALESCE("ranking"."floorChange7d", 0)', 'floorChange7d')
      .addSelect('COALESCE("ranking"."floorChange30d", 0)', 'floorChange30d')
      .addSelect('COALESCE("ranking"."saleCount", 0)', 'saleCount')
      .addSelect('COALESCE("ranking"."saleCount1h", 0)', 'saleCount1h')
      .addSelect('COALESCE("ranking"."saleCount6h", 0)', 'saleCount6h')
      .addSelect('COALESCE("ranking"."saleCount24h", 0)', 'saleCount24h')
      .addSelect('COALESCE("ranking"."saleCount7d", 0)', 'saleCount7d')
      .addSelect('COALESCE("ranking"."saleCount30d", 0)', 'saleCount30d')
      .addSelect('COALESCE("ranking"."totalSupply", 0)', 'totalSupply')
      .addSelect('COALESCE("ranking"."ownerCount", 0)', 'ownerCount')
      .addSelect('COALESCE("ranking"."listedCount", 0)', 'listedCount')
      .addSelect(
        (query) =>
          query
            .fromDummy()
            .select(
              `EXISTS ${query
                .subQuery()
                .select('1')
                .from(NotableCollection, 'notable')
                .where('"notable"."collectionAddress" = "collection"."address"')
                .getQuery()}`,
            ),
        'notable',
      );
  },
  name: 'collections_view',
})
export class Collection extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => CollectionType)
  @ViewColumn()
  type!: CollectionType;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  name!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  symbol!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  imageUrl!: string | null;

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  verified!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  explicit!: boolean;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  bannerUrl!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  description!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  deployedAt!: Date | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  deployer!: string | null;

  @Field(() => [CollectionLink])
  @ViewColumn()
  @Type(() => CollectionLink)
  @ValidateNested({ each: true })
  links!: CollectionLink[];

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  lastImport!: Date | null;

  // Cached columns

  @Field(() => String)
  @ViewColumn()
  volume!: string;

  @Field(() => String)
  @ViewColumn()
  volume1h!: string;

  @Field(() => String)
  @ViewColumn()
  volume6h!: string;

  @Field(() => String)
  @ViewColumn()
  volume24h!: string;

  @Field(() => String)
  @ViewColumn()
  volume7d!: string;

  @Field(() => String)
  @ViewColumn()
  volume30d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  floorPrice!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount1h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount6h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount24h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount7d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount30d!: string;

  @Field(() => String)
  @ViewColumn()
  totalSupply!: string;

  @Field(() => String)
  @ViewColumn()
  ownerCount!: string;

  @Field(() => String)
  @ViewColumn()
  listedCount!: string;

  @Field(() => Boolean)
  @ViewColumn()
  notable!: boolean;
}
