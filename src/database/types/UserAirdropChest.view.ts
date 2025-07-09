import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { AirdropTier, AirdropChest } from '../tables';
import {
  AirdropChestsType,
  AirdropUsersChestsStatus,
} from '../enums/Airdrops.enum';

@ObjectType()
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
            .from('airdrop_user_chest', 'user_chest')
            .innerJoin(
              'airdrop_chest',
              'chest',
              'chest.id = user_chest.chest_id',
            )
            .innerJoin(
              'airdrop_tier',
              'chest_tier',
              'chest_tier.id = chest.tier_id',
            )
            .where('user_chest.user_address = user.address'),
        'chests',
      )
      .from('airdrop_user', 'user')
      .innerJoin('airdrop_tier', 'tier', 'tier.id = user.tier_id');
  },
  name: 'user_airdrop_chest_view',
})
export class UserAirdropChest extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => AirdropTier)
  @ViewColumn()
  tier!: AirdropTier;

  @Field(() => [AirdropChest])
  @ViewColumn()
  chests!: AirdropChest[];
}

@ObjectType()
class LoyaltyInfo {
  @Field(() => String)
  points!: string;

  @Field(() => String)
  rank!: string;
}

export enum ChestRank {
  BRONZE_3 = 'BRONZE_3',
  SILVER_1 = 'SILVER_1',
  GOLD_3 = 'GOLD_3',
}

registerEnumType(ChestRank, {
  name: 'ChestRank',
});

@ObjectType()
export class AirdropChestByRank {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: AirdropChestsType;

  @Field(() => Number)
  count!: number;

  @Field(() => String)
  status!: AirdropUsersChestsStatus;
}

@ObjectType()
export class ChestsByRank {
  @Field(() => [AirdropChestByRank], { nullable: true })
  BRONZE_3?: AirdropChestByRank[];

  @Field(() => [AirdropChestByRank], { nullable: true })
  SILVER_1?: AirdropChestByRank[];

  @Field(() => [AirdropChestByRank], { nullable: true })
  GOLD_3?: AirdropChestByRank[];
}

@ObjectType()
export class UserAirdropChestLoyalty {
  @Field(() => String)
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => AirdropTier)
  tier!: AirdropTier;

  @Field(() => ChestsByRank)
  chestsByRank!: ChestsByRank;

  @Field(() => LoyaltyInfo)
  loyalty!: LoyaltyInfo;
}
