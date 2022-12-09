import 'reflect-metadata';
import { DataSource } from 'typeorm';
import '../../config';

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
    synchronize: false,
    migrationsRun: true,
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/entity/**.entity{.js,.ts}'],
    migrations: [__dirname + '/migration/*{.js,.ts}'],
    subscribers: [],
});

export * from './entity';
