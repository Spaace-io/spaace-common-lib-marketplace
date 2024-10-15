import { registerEnumType } from '@nestjs/graphql';

export enum DistributorContract {
  TRADING_REWARDS = 'TRADING_REWARDS',
  REFERRAL_REWARDS = 'REFERRAL_REWARDS',
  LOYALTY_REWARDS = 'LOYALTY_REWARDS',
}

registerEnumType(DistributorContract, {
  name: 'DistributorContract',
});
