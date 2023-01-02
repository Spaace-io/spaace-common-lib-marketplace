"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
// Primary key = (txHash, logIdx, from, to, collection, item, timestamp)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)
// Timestamp is required to be in all unique keys, including the primary one, by TimescaleDB
let Transfer = class Transfer extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], Transfer.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Transfer.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Transfer.prototype, "item", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], Transfer.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    (0, typeorm_1.Index)('transfers_timestamp_idx') // Required for TimescaleDB's create_hypertable
    ,
    __metadata("design:type", Date)
], Transfer.prototype, "timestamp", void 0);
Transfer = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'transfers' })
], Transfer);
exports.Transfer = Transfer;
//# sourceMappingURL=Transfer.entity.js.map