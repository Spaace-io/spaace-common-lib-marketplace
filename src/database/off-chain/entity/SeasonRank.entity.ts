import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import {
  Field,
  ObjectType,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';
import { Season } from '.';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export enum LoyaltyRank {
  BRONZE_5 = 'BRONZE_5',
  BRONZE_4 = 'BRONZE_4',
  BRONZE_3 = 'BRONZE_3',
  BRONZE_2 = 'BRONZE_2',
  BRONZE_1 = 'BRONZE_1',
  SILVER_5 = 'SILVER_5',
  SILVER_4 = 'SILVER_4',
  SILVER_3 = 'SILVER_3',
  SILVER_2 = 'SILVER_2',
  SILVER_1 = 'SILVER_1',
  GOLD_5 = 'GOLD_5',
  GOLD_4 = 'GOLD_4',
  GOLD_3 = 'GOLD_3',
  GOLD_2 = 'GOLD_2',
  GOLD_1 = 'GOLD_1',
  PLATINUM_5 = 'PLATINUM_5',
  PLATINUM_4 = 'PLATINUM_4',
  PLATINUM_3 = 'PLATINUM_3',
  PLATINUM_2 = 'PLATINUM_2',
  PLATINUM_1 = 'PLATINUM_1',
  DIAMOND_5 = 'DIAMOND_5',
  DIAMOND_4 = 'DIAMOND_4',
  DIAMOND_3 = 'DIAMOND_3',
  DIAMOND_2 = 'DIAMOND_2',
  DIAMOND_1 = 'DIAMOND_1',
}

registerEnumType(LoyaltyRank, {
  name: 'LoyaltyRank',
});

export enum LoyaltyRewardType {
  LOYALTY_POINTS = 'LOYALTY_POINTS',
  STAKING_BONUS = 'STAKING_BONUS',
  SPAACE_TOKENS = 'SPAACE_TOKENS',
  COSMETIC = 'COSMETIC',
}

registerEnumType(LoyaltyRewardType, {
  name: 'LoyaltyRewardType',
});

@ObjectType()
export class LoyaltyPointsLoyaltyReward {
  readonly type = LoyaltyRewardType.LOYALTY_POINTS;

  constructor(min: string, max: string) {
    this.min = min;
    this.max = max;
  }

  @Field(() => String)
  min: string;

  @Field(() => String)
  max: string;
}

@ObjectType()
export class StakingBonusLoyaltyReward {
  readonly type = LoyaltyRewardType.STAKING_BONUS;

  constructor(min: string, max: string) {
    this.min = min;
    this.max = max;
  }

  @Field(() => String)
  min: string;

  @Field(() => String)
  max: string;
}

@ObjectType()
export class SpaaceTokensLoyaltyReward {
  readonly type = LoyaltyRewardType.SPAACE_TOKENS;

  constructor(min: string, max: string) {
    this.min = min;
    this.max = max;
  }

  @Field(() => String)
  min: string;

  @Field(() => String)
  max: string;
}

@ObjectType()
export class CosmeticLoyaltyReward {
  readonly type = LoyaltyRewardType.COSMETIC;

  constructor(ids: string[]) {
    this.ids = ids;
  }

  @Field(() => [String])
  ids: string[];
}

export const LoyaltyReward = createUnionType({
  name: 'LoyaltyReward',
  types: () => [
    LoyaltyPointsLoyaltyReward,
    StakingBonusLoyaltyReward,
    SpaaceTokensLoyaltyReward,
    CosmeticLoyaltyReward,
  ],
});

@ObjectType()
@Entity({ name: 'season_ranks' })
export class SeasonRank extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => LoyaltyRank)
  @PrimaryColumn('enum', { enum: LoyaltyRank, enumName: 'rank' })
  @ValidateNested()
  rank!: LoyaltyRank;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  threshold!: string;

  @Field(() => [LoyaltyReward])
  @Column('jsonb', { default: [] })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        {
          name: LoyaltyRewardType.LOYALTY_POINTS,
          value: LoyaltyPointsLoyaltyReward,
        },
        {
          name: LoyaltyRewardType.STAKING_BONUS,
          value: StakingBonusLoyaltyReward,
        },
        {
          name: LoyaltyRewardType.SPAACE_TOKENS,
          value: SpaaceTokensLoyaltyReward,
        },
        {
          name: LoyaltyRewardType.COSMETIC,
          value: CosmeticLoyaltyReward,
        },
      ],
    },
  })
  @ValidateNested({ each: true })
  rewards!: (typeof LoyaltyReward)[];
}
