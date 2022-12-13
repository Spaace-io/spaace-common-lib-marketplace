import 'reflect-metadata';
import { DataSource } from 'typeorm';
import '../../config';

const host = process.env.TIMESCALE_DB_HOST ?? 'localhost';
const port = parseInt(process.env.TIMESCALE_DB_PORT ?? '5432', 10);
const username = process.env.TIMESCALE_DB_USERNAME ?? 'root';
const password = process.env.TIMESCALE_DB_PASSWORD;
const database = process.env.TIMESCALE_DB_DATABASE;
const schema = process.env.TIMESCALE_DB_SCHEMA;

export const TimescaleDatabase = new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    schema,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [__dirname + '/entity/**.entity{.js,.ts}'],
    migrations: [__dirname + '/migration/*{.js,.ts}'],
    subscribers: [],
});

export * from './entity';
