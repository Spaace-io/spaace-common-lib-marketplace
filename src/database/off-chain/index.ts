import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

const host = process.env.OFF_CHAIN_DB_HOST ?? 'localhost';
const port = parseInt(process.env.OFF_CHAIN_DB_PORT ?? '5432', 10);
const username = process.env.OFF_CHAIN_DB_USERNAME ?? 'root';
const password = process.env.OFF_CHAIN_DB_PASSWORD;
const database = process.env.OFF_CHAIN_DB_DATABASE;
const schema = process.env.OFF_CHAIN_DB_SCHEMA;

export const OffChainDatabase = new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

export * from './entity';
