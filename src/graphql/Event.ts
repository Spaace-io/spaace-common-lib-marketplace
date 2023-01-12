import { createUnionType } from '@nestjs/graphql';
import { Order, Sale, Transfer } from '..';

export const Event: Transfer | Order | Sale = createUnionType({
    name: 'Event',
    types: () => [Transfer, Order, Sale],
});
