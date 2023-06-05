# Spaace common-lib

This repository is a Node.js package.\
It is ment to be shared between all backend services.\
It contains database connections, TypeORM entities, and other reused helper functions.

## Usage

To install this package in **target** services, run:

```sh
npm i @spaace/common-lib
```

It can then be used as follows:

```typescript
import {
  OnChainDatabase,
  OffChainDatabase,
  PubSubClient,
  FirestoreClient,
} from '@spaace/common-lib';

await OnChainDatabase.initialize();
await OffChainDatabase.initialize();
await PubSubClient.initialize();
await FirestoreClient.initialize();

// OR

import { OnChainDatabase } from '@spaace/common-lib/dist/database/on-chain';
import { OffChainDatabase } from '@spaace/common-lib/dist/database/off-chain';
import { PubSubClient } from '@spaace/common-lib/dist/pubsub/client';
import { FirestoreClient } from '@spaace/common-lib/dist/database/firestore';

await OnChainDatabase.initialize();
await OffChainDatabase.initialize();
await PubSubClient.initialize();
await FirestoreClient.initialize();
```

Only databases on which the service is dependendant should (and must) be initialized.

## Contributing

To update this repository, update files in the `src` folder, then run:

```sh
npm run build
```

You can then push all changes to the `dev` branch.

To test out the changes in **target** services, run:

```sh
npm i git+ssh://git@github.com/avicenne-studio/spaace-common-lib.git#dev
```

## TypeORM migrations

Because this repository contains the TypeORM database entities, it must also contain migrations for the on-chain and off-chain databases.

To automatically generate migrations, use the TypeORM CLI through the provided NPM scripts with:

```sh
npm run migration:generate:on-chain --name=<name>
# OR
npm run migration:generate:off-chain --name=<name>
```

Finally, before commiting, update the `dist` folder to add the migrations by running:

```sh
npm run build
```

## Updating

After each change to this package merged onto the `main` branch, **target** services must be updated to use the new version.

To do so, run the following in the **target** services:

```sh
npm up @spaace/common-lib
```
