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
  Int,
  ObjectType,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';
import { Season, UserSeasonRankClaim } from '.';
import { Type } from 'class-transformer';

export enum LoyaltyRank {
  BRONZE_5 = 'B5',
  BRONZE_4 = 'B4',
  BRONZE_3 = 'B3',
  BRONZE_2 = 'B2',
  BRONZE_1 = 'B1',
  SILVER_5 = 'S5',
  SILVER_4 = 'S4',
  SILVER_3 = 'S3',
  SILVER_2 = 'S2',
  SILVER_1 = 'S1',
  GOLD_5 = 'G5',
  GOLD_4 = 'G4',
  GOLD_3 = 'G3',
  GOLD_2 = 'G2',
  GOLD_1 = 'G1',
  PLATINUM_5 = 'P5',
  PLATINUM_4 = 'P4',
  PLATINUM_3 = 'P3',
  PLATINUM_2 = 'P2',
  PLATINUM_1 = 'P1',
  DIAMOND_5 = 'D5',
  DIAMOND_4 = 'D4',
  DIAMOND_3 = 'D3',
  DIAMOND_2 = 'D2',
  DIAMOND_1 = 'D1',
}

registerEnumType(LoyaltyRank, {
  name: 'LoyaltyRank',
});

@ObjectType()
export class LoyaltyPointsLoyaltyReward {
  @Field(() => String)
  min!: string;

  @Field(() => String)
  max!: string;
}

@ObjectType()
export class StakingBonusLoyaltyReward {
  @Field(() => String)
  min!: string;

  @Field(() => String)
  max!: string;
}

@ObjectType()
export class SpaaceTokensLoyaltyReward {
  @Field(() => String)
  min!: string;

  @Field(() => String)
  max!: string;
}

@ObjectType()
export class CosmeticLoyaltyReward {
  @Field(() => [String])
  ids!: string[];
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
  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: number;

  @Field(() => LoyaltyRank)
  @PrimaryColumn('enum', { enum: LoyaltyRank, enumName: 'rank' })
  rank!: LoyaltyRank;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  threshold!: string;

  @Field(() => [LoyaltyReward])
  @Column('jsonb', { default: [] })
  @Type(() => Object, {
    discriminator: {
      property: '__typename',
      subTypes: [
        {
          name: 'LoyaltyPointsLoyaltyReward',
          value: LoyaltyPointsLoyaltyReward,
        },
        {
          name: 'StakingBonusLoyaltyReward',
          value: StakingBonusLoyaltyReward,
        },
        {
          name: 'SpaaceTokensLoyaltyReward',
          value: SpaaceTokensLoyaltyReward,
        },
        {
          name: 'CosmeticLoyaltyReward',
          value: CosmeticLoyaltyReward,
        },
      ],
    },
  })
  rewards!: (typeof LoyaltyReward)[];

  // GraphQL only fields

  @Field(() => SeasonRank, { nullable: true })
  @Type(() => SeasonRank)
  previousRank?: SeasonRank | null;

  @Field(() => SeasonRank, { nullable: true })
  @Type(() => SeasonRank)
  nextRank?: SeasonRank | null;

  @Field(() => UserSeasonRankClaim, { nullable: true })
  @Type(() => UserSeasonRankClaim)
  claim?: UserSeasonRankClaim | null;
}
