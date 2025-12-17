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
var _a, _b, _c, _d, _e, _f, _g, _h;
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
    ssl,
};
const useCluster = (_d = process.env.DATABASE_USER_CLUSTER) !== null && _d !== void 0 ? _d : false;
const masterHost = (_e = process.env.DATABASE_MASTER_HOST) !== null && _e !== void 0 ? _e : 'localhost';
const masterPort = parseInt((_f = process.env.DATABASE_MASTER_PORT) !== null && _f !== void 0 ? _f : '5432', 10);
const replicaHost = (_g = process.env.DATABASE_REPLICA_HOST) !== null && _g !== void 0 ? _g : 'localhost';
const replicaPort = parseInt((_h = process.env.DATABASE_REPLICA_PORT) !== null && _h !== void 0 ? _h : '5432', 10);
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
__exportStar(require("./types"), exports);
__exportStar(require("./enums"), exports);
//# sourceMappingURL=index.js.map