import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Address } from './entity/Address';

const host = process.env.ON_CHAIN_DB_HOST ?? 'localhost';
const port = parseInt(process.env.ON_CHAIN_DB_PORT ?? '5432', 10);
const username = process.env.ON_CHAIN_DB_USERNAME ?? 'root';
const password = process.env.ON_CHAIN_DB_PASSWORD;
const database = process.env.ON_CHAIN_DB_DATABASE;
const schema = process.env.ON_CHAIN_DB_SCHEMA;

export const OnChainDatabase = new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    synchronize: true,
    logging: false,
    entities: [Address],
    migrations: [],
    subscribers: [],
});

export * from './entity';
