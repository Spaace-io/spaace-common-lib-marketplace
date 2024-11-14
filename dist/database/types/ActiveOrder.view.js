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
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
const enums_1 = require("../enums");
let ActiveOrderCached = class ActiveOrderCached extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], ActiveOrderCached.prototype, "tokenIds", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.OrderType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.Marketplace),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "marketplace", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "startingPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ActiveOrderCached.prototype, "marketplaceFeeBps", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "marketplaceFeeReceiver", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ActiveOrderCached.prototype, "royaltiesBps", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "startingRoyalties", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "royaltiesReceiver", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ActiveOrderCached.prototype, "startTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "endTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "counter", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "salt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "zone", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "conduitKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "protocolAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "signature", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => value !== null
        ? ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null, {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "cancelTxHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "cancelLogIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveOrderCached.prototype, "cancelTimestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "fulfillQuantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "remainingQuantity", void 0);
ActiveOrderCached = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.ActiveOrderCachedEntity, 'order')
                .select('"order"."hash"', 'hash')
                .addSelect('"order"."userAddress"', 'userAddress')
                .addSelect('"order"."collectionAddress"', 'collectionAddress')
                .addSelect('"order"."type"', 'type')
                .addSelect('"order"."marketplace"', 'marketplace')
                .addSelect('"order"."price"', 'price')
                .addSelect('"order"."startingPrice"', 'startingPrice')
                .addSelect('"order"."currency"', 'currency')
                .addSelect('"order"."marketplaceFeeBps"', 'marketplaceFeeBps')
                .addSelect('"order"."marketplaceFeeReceiver"', 'marketplaceFeeReceiver')
                .addSelect('"order"."royaltiesBps"', 'royaltiesBps')
                .addSelect('"order"."startingRoyalties"', 'startingRoyalties')
                .addSelect('"order"."royaltiesReceiver"', 'royaltiesReceiver')
                .addSelect('"order"."startTime"', 'startTime')
                .addSelect('"order"."endTime"', 'endTime')
                .addSelect('"order"."counter"', 'counter')
                .addSelect('"order"."salt"', 'salt')
                .addSelect('"order"."zone"', 'zone')
                .addSelect('"order"."conduitKey"', 'conduitKey')
                .addSelect('"order"."protocolAddress"', 'protocolAddress')
                .addSelect('"order"."signature"', 'signature')
                .addSelect('"order"."cancelTxHash"', 'cancelTxHash')
                .addSelect('"order"."cancelLogIdx"', 'cancelLogIdx')
                .addSelect('"order"."cancelTimestamp"', 'cancelTimestamp')
                .addSelect('"order"."fulfillQuantity"', 'fulfillQuantity')
                .addSelect('"order"."remainingQuantity"', 'remainingQuantity')
                .addSelect((query) => query
                .from(__1.OrderItemEntity, 'orders_items')
                .select('array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"')
                .where('"orders_items"."hash" = "order"."hash"'), 'tokenIds');
        },
        name: 'active_orders_cache_view',
    })
], ActiveOrderCached);
exports.ActiveOrderCached = ActiveOrderCached;
//# sourceMappingURL=ActiveOrder.view.js.map