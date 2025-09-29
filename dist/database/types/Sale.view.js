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
exports.Sale = exports.FeeItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
const enums_1 = require("../enums");
let FeeItem = class FeeItem {
};
exports.FeeItem = FeeItem;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FeeItem.prototype, "kind", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FeeItem.prototype, "rawAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], FeeItem.prototype, "source", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], FeeItem.prototype, "recipient", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], FeeItem.prototype, "bps", void 0);
exports.FeeItem = FeeItem = __decorate([
    (0, graphql_1.ObjectType)()
], FeeItem);
let Sale = class Sale extends typeorm_1.BaseEntity {
};
exports.Sale = Sale;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "orderHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "perUnitPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Sale.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.Marketplace),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Sale.prototype, "marketplace", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], Sale.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [FeeItem]),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], Sale.prototype, "feeBreakdown", void 0);
exports.Sale = Sale = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.SaleEntity, 'sale')
                .select('"sale"."txHash"', 'txHash')
                .addSelect('"sale"."logIdx"', 'logIdx')
                .addSelect('"sale"."orderHash"', 'orderHash')
                .addSelect('"sale"."collectionAddress"', 'collectionAddress')
                .addSelect('"sale"."tokenId"', 'tokenId')
                .addSelect('"sale"."amount"', 'amount')
                .addSelect('"sale"."from"', 'from')
                .addSelect('"sale"."to"', 'to')
                .addSelect('"sale"."price"', 'price')
                .addSelect('"sale"."perUnitPrice"', 'perUnitPrice')
                .addSelect('"sale"."currency"', 'currency')
                .addSelect('"sale"."marketplace"', 'marketplace')
                .addSelect('"sale"."timestamp"', 'timestamp')
                .addSelect('"sale"."feeBreakdown"', 'feeBreakdown');
        },
        name: 'sales_view',
    })
], Sale);
//# sourceMappingURL=Sale.view.js.map