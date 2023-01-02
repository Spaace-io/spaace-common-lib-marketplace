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
exports.Sale = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let Sale = class Sale extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], Sale.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Sale.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('char', { length: 64 }),
    __metadata("design:type", String)
], Sale.prototype, "orderHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], Sale.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], Sale.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], Sale.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Sale.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)({ default: () => 'CURRENT_TIMESTAMP' }),
    (0, typeorm_1.Index)('sales_timestamp_idx') // Required for TimescaleDB's create_hypertable
    ,
    __metadata("design:type", Date)
], Sale.prototype, "timestamp", void 0);
Sale = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'sales' })
], Sale);
exports.Sale = Sale;
//# sourceMappingURL=Sale.entity.js.map