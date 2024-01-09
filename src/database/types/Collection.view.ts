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
      .addSelect('COALESCE("ranking"."volume90d", 0)', 'volume90d')
      .addSelect(
        'COALESCE("ranking"."previousVolume1h", 0)',
        'previousVolume1h',
      )
      .addSelect(
        'COALESCE("ranking"."previousVolume6h", 0)',
        'previousVolume6h',
      )
      .addSelect(
        'COALESCE("ranking"."previousVolume24h", 0)',
        'previousVolume24h',
      )
      .addSelect(
        'COALESCE("ranking"."previousVolume7d", 0)',
        'previousVolume7d',
      )
      .addSelect(
        'COALESCE("ranking"."previousVolume30d", 0)',
        'previousVolume30d',
      )
      .addSelect(
        'COALESCE("ranking"."previousVolume90d", 0)',
        'previousVolume90d',
      )
      .addSelect('"ranking"."floorPrice"', 'floorPrice')
      .addSelect('"ranking"."previousFloorPrice1h"', 'previousFloorPrice1h')
      .addSelect('"ranking"."previousFloorPrice6h"', 'previousFloorPrice6h')
      .addSelect('"ranking"."previousFloorPrice24h"', 'previousFloorPrice24h')
      .addSelect('"ranking"."previousFloorPrice7d"', 'previousFloorPrice7d')
      .addSelect('"ranking"."previousFloorPrice30d"', 'previousFloorPrice30d')
      .addSelect('"ranking"."previousFloorPrice90d"', 'previousFloorPrice90d')
      .addSelect('COALESCE("ranking"."saleCount", 0)', 'saleCount')
      .addSelect('COALESCE("ranking"."saleCount1h", 0)', 'saleCount1h')
      .addSelect('COALESCE("ranking"."saleCount6h", 0)', 'saleCount6h')
      .addSelect('COALESCE("ranking"."saleCount24h", 0)', 'saleCount24h')
      .addSelect('COALESCE("ranking"."saleCount7d", 0)', 'saleCount7d')
      .addSelect('COALESCE("ranking"."saleCount30d", 0)', 'saleCount30d')
      .addSelect('COALESCE("ranking"."saleCount90d", 0)', 'saleCount90d')
      .addSelect(
        'COALESCE("ranking"."previousSaleCount1h", 0)',
        'previousSaleCount1h',
      )
      .addSelect(
        'COALESCE("ranking"."previousSaleCount6h", 0)',
        'previousSaleCount6h',
      )
      .addSelect(
        'COALESCE("ranking"."previousSaleCount24h", 0)',
        'previousSaleCount24h',
      )
      .addSelect(
        'COALESCE("ranking"."previousSaleCount7d", 0)',
        'previousSaleCount7d',
      )
      .addSelect(
        'COALESCE("ranking"."previousSaleCount30d", 0)',
        'previousSaleCount30d',
      )
      .addSelect(
        'COALESCE("ranking"."previousSaleCount90d", 0)',
        'previousSaleCount90d',
      )
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
  volume90d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume1h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume6h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume24h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume7d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume30d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume90d!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  floorPrice!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice1h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice6h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice24h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice7d!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice30d!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice90d!: string | null;

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
  saleCount90d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount1h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount6h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount24h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount7d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount30d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount90d!: string;

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
