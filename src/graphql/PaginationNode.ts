import { createUnionType } from '@nestjs/graphql';
import { Collection, Item, Order, Transfer } from '..';

export const PaginationNode = createUnionType({
    name: 'PaginationNode',
    types: () => [Collection, Item, Order, Transfer],
});
