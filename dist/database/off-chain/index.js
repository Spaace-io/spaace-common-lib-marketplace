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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffChainDatabase = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var host = (_a = process.env.OFF_CHAIN_DB_HOST) !== null && _a !== void 0 ? _a : 'localhost';
var port = parseInt((_b = process.env.OFF_CHAIN_DB_PORT) !== null && _b !== void 0 ? _b : '5432', 10);
var username = (_c = process.env.OFF_CHAIN_DB_USERNAME) !== null && _c !== void 0 ? _c : 'root';
var password = process.env.OFF_CHAIN_DB_PASSWORD;
var database = process.env.OFF_CHAIN_DB_DATABASE;
var schema = process.env.OFF_CHAIN_DB_SCHEMA;
exports.OffChainDatabase = new typeorm_1.DataSource({
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    schema: schema,
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
__exportStar(require("./entity"), exports);
//# sourceMappingURL=index.js.map