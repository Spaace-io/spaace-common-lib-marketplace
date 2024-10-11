import { registerEnumType } from '@nestjs/graphql';

export enum Marketplace {
  SPAACE = 'SPAACE',
  OPENSEA = 'OPENSEA',
  BLUR = 'BLUR',
}

registerEnumType(Marketplace, {
  name: 'Marketplace',
});
