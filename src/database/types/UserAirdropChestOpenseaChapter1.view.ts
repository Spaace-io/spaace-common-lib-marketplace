import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import {
  AirdropTierOpenseaChapter1,
  AirdropChestOpenseaChapter1,
} from '../tables';
import {
  AirdropChestsTypeOpenseaChapter1,
  AirdropUsersChestsStatusOpenseaChapter1,
} from '../enums/Airdrops.enum';

@ObjectType('UserAirdropChestOpenseaChapter1View')
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .select('user.address', 'address')
      .addSelect('tier.id', 'tierId')
      .addSelect('tier.name', 'tierName')
      .addSelect('tier.totalXp', 'tierTotalXp')
      .addSelect('tier.totalChestsCount', 'tierTotalChestsCount')
      .addSelect(
        (qb) =>
          qb
            .select(
              `jsonb_agg(
              jsonb_build_object(
                'id', chest.id,
                'type', chest.type,
                'valueXp', chest.valueXp,
                'status', user_chest.status,
                'quantity', user_chest.quantity,
                'tier', jsonb_build_object(
                  'id', tier.id,
                  'name', tier.name,
                  'totalXp', tier.totalXp,
                  'totalChestsCount', tier.totalChestsCount
                )
              )
            )`,
              'chests',
            )
            .from('airdrop_users_chests_opensea_chapter1', 'user_chest')
            .innerJoin(
              'airdrop_chests_opensea_chapter1',
              'chest',
              'chest.id = user_chest.chestId',
            )
            .where('user_chest.address = user.address'),
        'chests',
      )
      .from('airdrop_users_opensea_chapter1', 'user')
      .innerJoin(
        'airdrop_tiers_opensea_chapter1',
        'tier',
        'tier.id = user.tierId',
      );
  },
  name: 'user_airdrop_chest_view_opensea_chapter1',
})
export class UserAirdropChestOpenseaChapter1View extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => AirdropTierOpenseaChapter1)
  @ViewColumn()
  tier!: AirdropTierOpenseaChapter1;

  @Field(() => [AirdropChestOpenseaChapter1])
  @ViewColumn()
  chests!: AirdropChestOpenseaChapter1[];
}

@ObjectType()
class LoyaltyInfoOpenseaChapter1 {
  @Field(() => String)
  points!: string;

  @Field(() => String)
  rank!: string;
}

export enum ChestRankOpenseaChapter1 {
  BRONZE_3 = 'BRONZE_3',
  SILVER_1 = 'SILVER_1',
  GOLD_3 = 'GOLD_3',
}

registerEnumType(ChestRankOpenseaChapter1, {
  name: 'ChestRankOpenseaChapter1',
});

@ObjectType()
export class AirdropChestByRankOpenseaChapter1 {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: AirdropChestsTypeOpenseaChapter1;

  @Field(() => Number)
  count!: number;

  @Field(() => String)
  status!: AirdropUsersChestsStatusOpenseaChapter1;
}

@ObjectType()
export class ChestsByRankOpenseaChapter1 {
  @Field(() => [AirdropChestByRankOpenseaChapter1], { nullable: true })
  BRONZE_3?: AirdropChestByRankOpenseaChapter1[];

  @Field(() => [AirdropChestByRankOpenseaChapter1], { nullable: true })
  SILVER_1?: AirdropChestByRankOpenseaChapter1[];

  @Field(() => [AirdropChestByRankOpenseaChapter1], { nullable: true })
  GOLD_3?: AirdropChestByRankOpenseaChapter1[];
}

@ObjectType()
export class UserAirdropChestLoyaltyOpenseaChapter1 {
  @Field(() => String)
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => AirdropTierOpenseaChapter1)
  tier!: AirdropTierOpenseaChapter1;

  @Field(() => ChestsByRankOpenseaChapter1)
  chestsByRank!: ChestsByRankOpenseaChapter1;

  @Field(() => LoyaltyInfoOpenseaChapter1)
  loyalty!: LoyaltyInfoOpenseaChapter1;
}
