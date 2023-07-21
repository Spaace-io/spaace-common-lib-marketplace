import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Field, Int, ObjectType, createUnionType } from '@nestjs/graphql';
import { LoyaltyRank, SeasonRank, User } from '.';
import { ethers } from 'ethers';
import { Transform, Type } from 'class-transformer';

@ObjectType()
export class LoyaltyPointsLoyaltyRewardClaim {
  readonly __typename = 'LoyaltyPointsLoyaltyRewardClaim';

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class StakingBonusLoyaltyRewardClaim {
  readonly __typename = 'StakingBonusLoyaltyRewardClaim';

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class SpaaceTokensLoyaltyRewardClaim {
  readonly __typename = 'SpaaceTokensLoyaltyRewardClaim';

  constructor(amount: string) {
    this.amount = amount;
  }

  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class CosmeticLoyaltyRewardClaim {
  readonly __typename = 'CosmeticLoyaltyRewardClaim';

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
  rank!: LoyaltyRank;

  @Field(() => [LoyaltyRewardClaim])
  @Column('jsonb', { default: [] })
  @Type(() => Object, {
    discriminator: {
      property: '__typename',
      subTypes: [
        {
          name: 'LoyaltyPointsLoyaltyRewardClaim',
          value: LoyaltyPointsLoyaltyRewardClaim,
        },
        {
          name: 'StakingBonusLoyaltyRewardClaim',
          value: StakingBonusLoyaltyRewardClaim,
        },
        {
          name: 'SpaaceTokensLoyaltyRewardClaim',
          value: SpaaceTokensLoyaltyRewardClaim,
        },
        {
          name: 'CosmeticLoyaltyRewardClaim',
          value: CosmeticLoyaltyRewardClaim,
        },
      ],
    },
  })
  rewards!: (typeof LoyaltyRewardClaim)[];

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
