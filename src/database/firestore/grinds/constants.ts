import { n18 } from '../../../utils';
import { RuleEventProperty, RuleOperator } from '../types';

export const MIN_SALE_PRICE = {
  property: RuleEventProperty.SALE_PRICE,
  operator: RuleOperator.GTE,
  value: n18('0.05').toString(),
};

export const TOP_50_VOLUME = {
  property: RuleEventProperty.VOLUME_RANKING,
  operator: RuleOperator.LTE,
  value: '50',
};

export const activityTime = (hours: string) => {
  return {
    property: RuleEventProperty.LIFE_TIME,
    operator: RuleOperator.GTE,
    value: hours,
  };
};
