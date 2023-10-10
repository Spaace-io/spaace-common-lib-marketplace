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
exports.CollectionAttributeTrait = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const tables_1 = require("../tables");
const class_transformer_1 = require("class-transformer");
let CollectionAttributeTrait = class CollectionAttributeTrait extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionAttributeTrait.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttributeTrait.prototype, "traitHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttributeTrait.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttributeTrait.prototype, "valueCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionAttributeTrait.prototype, "itemCount", void 0);
CollectionAttributeTrait = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.ItemAttributeEntity, 'attribute')
                .select('"attribute"."collectionAddress"')
                .addSelect('"attribute"."traitHash"', 'traitHash')
                .addSelect('MIN("attribute"."trait")', 'trait')
                .addSelect('COUNT(DISTINCT "attribute"."valueHash")', 'valueCount')
                .addSelect('COUNT(DISTINCT "attribute"."tokenId")', 'itemCount')
                .groupBy('"attribute"."collectionAddress"')
                .addGroupBy('"attribute"."traitHash"');
        },
        name: 'collection_attribute_traits_view',
    })
], CollectionAttributeTrait);
exports.CollectionAttributeTrait = CollectionAttributeTrait;
//# sourceMappingURL=CollectionAttributeTrait.view.js.map