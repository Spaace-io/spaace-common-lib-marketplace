import { createUnionType } from '@nestjs/graphql';
import { Order, SaleEntity, TransferEntity } from '..';

export const Event: TransferEntity | Order | SaleEntity = createUnionType({
  name: 'Event',
  types: () => [TransferEntity, Order, SaleEntity],
});
