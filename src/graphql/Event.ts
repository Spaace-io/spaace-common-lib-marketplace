import { createUnionType } from '@nestjs/graphql';
import { Order, Sale, Transfer } from '..';

export const Event = createUnionType({
  name: 'Event',
  types: () => [Transfer, Order, Sale] as const,
});
