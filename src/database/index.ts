import 'reflect-metadata';
import { DataSource } from 'typeorm';
import '../config';

const host = process.env.DATABASE_HOST ?? 'localhost';
const port = parseInt(process.env.DATABASE_PORT ?? '5432', 10);
const username = process.env.DATABASE_USERNAME ?? 'root';
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const schema = process.env.DATABASE_SCHEMA;
const ssl = process.env.DATABASE_SSL === 'true';
export const Database = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  schema,
  migrationsRun: false,
  logging: false,
  entities: [
    __dirname + '/tables/**.entity.{js,ts}',
    __dirname + '/cache/**.entity.{js,ts}',
    __dirname + '/types/**.view.{js,ts}',
  ],
  synchronize: true,
  migrations: [__dirname + '/migrations/*-*.{js,ts}'],
  subscribers: [],
  ssl,
});

export * from './tables';
export * from './cache';
export * from './types';
