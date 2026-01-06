"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("../config");
const host = (_a = process.env.DATABASE_HOST) !== null && _a !== void 0 ? _a : 'localhost';
const port = parseInt((_b = process.env.DATABASE_PORT) !== null && _b !== void 0 ? _b : '5432', 10);
const username = (_c = process.env.DATABASE_USERNAME) !== null && _c !== void 0 ? _c : 'root';
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const schema = process.env.DATABASE_SCHEMA;
const applicationName = process.env.DATABASE_APPLICATION_NAME;
const ssl = process.env.DATABASE_SSL === 'true';
// Connection pool configuration
const poolMax = parseInt((_d = process.env.DATABASE_POOL_MAX) !== null && _d !== void 0 ? _d : '60', 10);
const poolMin = parseInt((_e = process.env.DATABASE_POOL_MIN) !== null && _e !== void 0 ? _e : '10', 10);
const connectionTimeoutMillis = parseInt((_f = process.env.DATABASE_CONNECTION_TIMEOUT) !== null && _f !== void 0 ? _f : '30000', 10);
const idleTimeoutMillis = parseInt((_g = process.env.DATABASE_IDLE_TIMEOUT) !== null && _g !== void 0 ? _g : '30000', 10);
const options = {
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
    extra: {
        max: poolMax,
        min: poolMin,
        connectionTimeoutMillis,
        idleTimeoutMillis,
        allowExitOnIdle: false,
    },
    ssl,
};
const useCluster = (_h = process.env.DATABASE_USER_CLUSTER) !== null && _h !== void 0 ? _h : false;
const masterHost = (_j = process.env.DATABASE_MASTER_HOST) !== null && _j !== void 0 ? _j : 'localhost';
const masterPort = parseInt((_k = process.env.DATABASE_MASTER_PORT) !== null && _k !== void 0 ? _k : '5432', 10);
const replicaHost = (_l = process.env.DATABASE_REPLICA_HOST) !== null && _l !== void 0 ? _l : 'localhost';
const replicaPort = parseInt((_m = process.env.DATABASE_REPLICA_PORT) !== null && _m !== void 0 ? _m : '5432', 10);
const replicationOptions = {
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
    extra: {
        max: poolMax,
        min: poolMin,
        connectionTimeoutMillis,
        idleTimeoutMillis,
        allowExitOnIdle: false,
    },
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
};
exports.Database = new typeorm_1.DataSource(useCluster ? replicationOptions : options);
__exportStar(require("./tables"), exports);
__exportStar(require("./cache"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./enums"), exports);
//# sourceMappingURL=index.js.map