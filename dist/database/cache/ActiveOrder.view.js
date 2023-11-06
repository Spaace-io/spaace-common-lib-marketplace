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
exports.ActiveOrderCached = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const utils = require("../../utils");
let ActiveOrderCached = class ActiveOrderCached extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    (0, typeorm_1.ManyToOne)(() => __1.OrderEntity),
    (0, typeorm_1.JoinColumn)({ name: 'hash', referencedColumnName: 'hash' }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    (0, typeorm_1.ManyToOne)(() => __1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    (0, typeorm_1.ManyToOne)(() => __1.ItemEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "marketplace", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "startingPrice", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "counter", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "signature", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "cancelTxHash", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "cancelLogIdx", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "cancelTimestamp", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "royalties", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "startingRoyalties", void 0);
ActiveOrderCached = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.OrderEntity, 'order')
                .leftJoin((query) => query
                .from(__1.TokenBalanceEntity, 'tokenBalance')
                .select()
                .where('"tokenBalance"."balance" > 0'), 'tokenBalance', '"tokenBalance"."currency" = "order"."currency" AND "tokenBalance"."userAddress" = "order"."userAddress"')
                .leftJoin((query) => query
                .from(__1.BalanceEntity, 'balance')
                .select()
                .where('"balance"."balance" > 0'), 'balance', '"balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."userAddress" = "order"."userAddress"')
                .select('"order"."hash"', 'hash')
                .addSelect('"order"."userAddress"', 'userAddress')
                .addSelect('"order"."collectionAddress"', 'collectionAddress')
                .addSelect('"order"."tokenId"', 'tokenId')
                .addSelect('"order"."type"', 'type')
                .addSelect('"order"."marketplace"', 'marketplace')
                .addSelect('"order"."price"', 'price')
                .addSelect('"order"."startingPrice"', 'startingPrice')
                .addSelect('"order"."currency"', 'currency')
                .addSelect('"order"."startTime"', 'startTime')
                .addSelect('"order"."endTime"', 'endTime')
                .addSelect('"order"."counter"', 'counter')
                .addSelect('"order"."signature"', 'signature')
                .addSelect('"order"."cancelTxHash"', 'cancelTxHash')
                .addSelect('"order"."cancelLogIdx"', 'cancelLogIdx')
                .addSelect('"order"."cancelTimestamp"', 'cancelTimestamp')
                .addSelect('"order"."royalties"', 'royalties')
                .addSelect('"order"."startingRoyalties"', 'startingRoyalties')
                .where('"order"."startTime" <= NOW()')
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .andWhere('"order"."cancelTimestamp" IS NULL')
                .andWhere((query) => `NOT EXISTS ${query
                .subQuery()
                .from(__1.SaleEntity, 'sale')
                .select('1')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()}`)
                .andWhere(`CASE "order"."type" WHEN '${__1.OrderType.BID}' THEN COALESCE("tokenBalance"."balance", 0) >= "order"."price" ELSE COALESCE("balance"."balance", 0) > 0 END`);
            // TODO: Approvals
        },
        name: 'active_orders_cache',
        materialized: true,
    }),
    (0, typeorm_1.Index)(['hash'], { unique: true }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" = '${__1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'endTime'], {
        where: `"type" = '${__1.OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'price'], {
        where: `"type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'price'], {
        where: `"type" = '${__1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'endTime'], {
        where: `"type" = '${__1.OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    })
], ActiveOrderCached);
exports.ActiveOrderCached = ActiveOrderCached;
//# sourceMappingURL=ActiveOrder.view.js.map