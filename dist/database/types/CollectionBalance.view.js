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
exports.CollectionBalance = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
let CollectionBalance = class CollectionBalance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionBalance.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionBalance.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionBalance.prototype, "balance", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionBalance.prototype, "itemCount", void 0);
CollectionBalance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from((q) => q
                .subQuery()
                .from(__1.BalanceEntity, 'balance')
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('SUM("balance"."balance")', 'balance')
                .addSelect('COUNT(DISTINCT "balance"."tokenId")', 'itemCount')
                .where('"balance"."balance" > 0')
                .groupBy('"balance"."collectionAddress"')
                .addGroupBy('"balance"."userAddress"'), 'balance')
                .leftJoin(__1.CollectionRankingCached, 'collection', '"collection"."address" = "balance"."collectionAddress"')
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('"balance"."balance"', 'balance')
                .addSelect('"balance"."itemCount"', 'itemCount')
                // Used for searching
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."description"')
                .where('"collection"."address" = "balance"."collectionAddress"'), 'description')
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."name"')
                .where('"collection"."address" = "balance"."collectionAddress"'), 'name')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect('COALESCE("collection"."volume", 0)', 'volume')
                .addSelect('COALESCE("collection"."volume1h", 0)', 'volume1h')
                .addSelect('COALESCE("collection"."volume6h", 0)', 'volume6h')
                .addSelect('COALESCE("collection"."volume24h", 0)', 'volume24h')
                .addSelect('COALESCE("collection"."volume7d", 0)', 'volume7d')
                .addSelect('COALESCE("collection"."volume30d", 0)', 'volume30d')
                .addSelect('COALESCE("collection"."volume90d", 0)', 'volume90d'));
        },
        name: 'collection_balances_view',
    })
], CollectionBalance);
exports.CollectionBalance = CollectionBalance;
//# sourceMappingURL=CollectionBalance.view.js.map