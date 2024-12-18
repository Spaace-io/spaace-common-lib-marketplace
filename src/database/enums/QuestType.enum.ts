import { registerEnumType } from '@nestjs/graphql';

export enum QuestType {
  GENESIS = 'GENESIS',
  PRIME = 'PRIME',
  DAILY = 'DAILY',
  PROGRESSIVE = 'PROGRESSIVE',
}

registerEnumType(QuestType, {
  name: 'QuestType',
});
