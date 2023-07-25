import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';
import { LoyaltyRank, LoyaltyRewardType, SeasonRank, User } from '.';
import { ethers } from 'ethers';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ObjectType()
export class LoyaltyPointsLoyaltyRewardClaim {
  readonly type = LoyaltyRewardType.LOYALTY_POINTS;

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class StakingBonusLoyaltyRewardClaim {
  readonly type = LoyaltyRewardType.STAKING_BONUS;

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class SpaaceTokensLoyaltyRewardClaim {
  readonly type = LoyaltyRewardType.SPAACE_TOKENS;

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class CosmeticLoyaltyRewardClaim {
  readonly type = LoyaltyRewardType.COSMETIC;

  constructor(id: string) {
    this.id = id;
  }

  @Field(() => String)
  id!: string;
}

export const LoyaltyRewardClaim = createUnionType({
  name: 'LoyaltyRewardClaim',
  types: () => [
    LoyaltyPointsLoyaltyRewardClaim,
    StakingBonusLoyaltyRewardClaim,
    SpaaceTokensLoyaltyRewardClaim,
    CosmeticLoyaltyRewardClaim,
  ],
});

@ObjectType()
@Entity({ name: 'user_season_rank_claims' })
export class UserSeasonRankClaim extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  seasonNumber!: number;

  @Field(() => LoyaltyRank)
  @PrimaryColumn('enum', { enum: LoyaltyRank, enumName: 'rank' })
  @ManyToOne(() => SeasonRank)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'rank', referencedColumnName: 'rank' },
  ])
  @ValidateNested()
  rank!: LoyaltyRank;

  @Field(() => [LoyaltyRewardClaim])
  @Column('jsonb', { default: [] })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        {
          name: LoyaltyRewardType.LOYALTY_POINTS,
          value: LoyaltyPointsLoyaltyRewardClaim,
        },
        {
          name: LoyaltyRewardType.STAKING_BONUS,
          value: StakingBonusLoyaltyRewardClaim,
        },
        {
          name: LoyaltyRewardType.SPAACE_TOKENS,
          value: SpaaceTokensLoyaltyRewardClaim,
        },
        {
          name: LoyaltyRewardType.COSMETIC,
          value: CosmeticLoyaltyRewardClaim,
        },
      ],
    },
  })
  @ValidateNested()
  rewards!: (typeof LoyaltyRewardClaim)[];

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
