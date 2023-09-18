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
exports.TokenBalance = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const __1 = require("../../..");
const entity_1 = require("../entity");
const class_transformer_1 = require("class-transformer");
let TokenBalance = class TokenBalance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], TokenBalance.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], TokenBalance.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], TokenBalance.prototype, "balance", void 0);
TokenBalance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from((query) => query
                .from(entity_1.TokenTransferEntity, 'transfer')
                .select('"currency"')
                .addSelect('"to"', 'userAddress')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"currency"')
                .addGroupBy('"to"'), 'received')
                .leftJoin((query) => query
                .from(entity_1.TokenTransferEntity, 'transfer')
                .select('"currency"')
                .addSelect('"from"', 'userAddress')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"currency"')
                .addGroupBy('"from"'), 'sent', '"sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress"')
                .select('"received"."currency"')
                .addSelect('"received"."userAddress"')
                .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
                .where('"received"."total" > COALESCE("sent"."total", 0)')
                .andWhere(`"received"."userAddress" <> '${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}'`);
        },
        name: 'token_balances_view',
    }),
    (0, typeorm_1.Index)(['userAddress', 'currency'])
], TokenBalance);
exports.TokenBalance = TokenBalance;
//# sourceMappingURL=TokenBalance.view.js.map