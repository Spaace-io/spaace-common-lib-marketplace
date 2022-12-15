import { createUnionType } from '@nestjs/graphql';
import { Transfer } from '..';

export const Event = createUnionType({
    name: 'Event',
    types: () => [Transfer],
});
