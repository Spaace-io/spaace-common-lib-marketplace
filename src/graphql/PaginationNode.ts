import { createUnionType } from '@nestjs/graphql';
import { Collection, Item, Order, Sale, Transfer } from '..';

export const PaginationNode = createUnionType({
    name: 'PaginationNode',
    types: () => [Collection, Item, Order, Sale, Transfer],
});
