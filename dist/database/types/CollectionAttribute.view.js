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
exports.CollectionAttribute = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
let CollectionAttribute = class CollectionAttribute extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "traitHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "trait", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "valueHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "itemCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "listedCount", void 0);
CollectionAttribute = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            const query = dataSource.createQueryBuilder();
            return query
                .from(__1.ItemAttributeEntity, 'attribute')
                .select('"attribute"."collectionAddress"')
                .addSelect('"attribute"."traitHash"', 'traitHash')
                .addSelect('MIN("attribute"."trait")', 'trait')
                .addSelect('"attribute"."valueHash"', 'valueHash')
                .addSelect('MIN("attribute"."value")', 'value')
                .addSelect('COUNT(*)', 'itemCount')
                .addSelect(`SUM(CASE WHEN EXISTS ${query
                .subQuery()
                .from(__1.ActiveOrderCached, 'order')
                .select('1')
                .where(`"order"."type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}')`)
                .andWhere('"order"."collectionAddress" = "attribute"."collectionAddress"')
                .andWhere('"order"."tokenId" = "attribute"."tokenId"')
                .getQuery()} THEN 1 ELSE 0 END)`, 'listedCount')
                .groupBy('"attribute"."collectionAddress"')
                .addGroupBy('"attribute"."traitHash"')
                .addGroupBy('"attribute"."valueHash"');
        },
        name: 'collection_attributes_view',
    })
], CollectionAttribute);
exports.CollectionAttribute = CollectionAttribute;
//# sourceMappingURL=CollectionAttribute.view.js.map