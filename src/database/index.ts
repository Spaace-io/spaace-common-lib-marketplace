import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import '../config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const host = process.env.DATABASE_HOST ?? 'localhost';
const port = parseInt(process.env.DATABASE_PORT ?? '5432', 10);
const username = process.env.DATABASE_USERNAME ?? 'root';
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const schema = process.env.DATABASE_SCHEMA;
const applicationName = process.env.DATABASE_APPLICATION_NAME;
const ssl = process.env.DATABASE_SSL === 'true';

// Connection pool configuration
const poolMax = parseInt(process.env.DATABASE_POOL_MAX ?? '50', 10);
const poolMin = parseInt(process.env.DATABASE_POOL_MIN ?? '10', 10);
const connectionTimeoutMillis = parseInt(
  process.env.DATABASE_CONNECTION_TIMEOUT ?? '30000',
  10,
);
const idleTimeoutMillis = parseInt(
  process.env.DATABASE_IDLE_TIMEOUT ?? '30000',
  10,
);

const options: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  schema,
  applicationName,
  migrationsRun: false,
  logging: false,
  entities: [
    __dirname + '/tables/**.entity.{js,ts}',
    __dirname + '/cache/**.entity.{js,ts}',
    __dirname + '/types/**.view.{js,ts}',
  ],
  synchronize: false,
  migrations: [__dirname + '/migrations/*-*.{js,ts}'],
  subscribers: [],
  ssl,
  // PostgreSQL connection pool settings (passed to node-postgres)
  extra: {
    max: poolMax, // Maximum pool size
    min: poolMin, // Minimum pool size
    connectionTimeoutMillis, // Connection timeout
    idleTimeoutMillis, // Idle connection timeout
    allowExitOnIdle: false, // Don't exit when all connections idle
  },
};

const useCluster = process.env.DATABASE_USER_CLUSTER ?? false;
const masterHost = process.env.DATABASE_MASTER_HOST ?? 'localhost';
const masterPort = parseInt(process.env.DATABASE_MASTER_PORT ?? '5432', 10);
const replicaHost = process.env.DATABASE_REPLICA_HOST ?? 'localhost';
const replicaPort = parseInt(process.env.DATABASE_REPLICA_PORT ?? '5432', 10);

const replicationOptions: PostgresConnectionOptions = {
  type: 'postgres',
  schema,
  migrationsRun: false,
  logging: false,
  entities: [
    __dirname + '/tables/**.entity.{js,ts}',
    __dirname + '/cache/**.entity.{js,ts}',
    __dirname + '/types/**.view.{js,ts}',
  ],
  synchronize: false,
  migrations: [__dirname + '/migrations/*-*.{js,ts}'],
  subscribers: [],
  replication: {
    master: {
      host: masterHost,
      port: masterPort,
      username,
      password,
      database,
      applicationName,
      ssl,
    },
    slaves: [
      {
        host: replicaHost,
        port: replicaPort,
        username,
        password,
        database,
        applicationName,
        ssl,
      },
    ],
    defaultMode: 'slave',
  },
  // PostgreSQL connection pool settings for replication mode
  extra: {
    max: poolMax,
    min: poolMin,
    connectionTimeoutMillis,
    idleTimeoutMillis,
    allowExitOnIdle: false,
  },
};
export const Database = new DataSource(
  useCluster ? replicationOptions : options,
);

export * from './tables';
export * from './cache';
export * from './types';
export * from './enums';
