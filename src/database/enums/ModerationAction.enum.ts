import { registerEnumType } from '@nestjs/graphql';

export enum ModerationAction {
  BULK_SET_STATUS = 'BULK_SET_STATUS',
  MANUAL_SET_STATUS = 'MANUAL_SET_STATUS',
  ADD_BLACKLIST_ID = 'ADD_BLACKLIST_ID',
  REMOVE_BLACKLIST_ID = 'REMOVE_BLACKLIST_ID',
}

registerEnumType(ModerationAction, { name: 'ModerationAction' });
