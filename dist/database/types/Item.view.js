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
exports.Item = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const tables_1 = require("../tables");
const class_validator_1 = require("class-validator");
let Item = class Item extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Item.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Item.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "tokenUri", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tables_1.ItemMedia], { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Type)(() => tables_1.ItemMedia),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Object)
], Item.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "rarityRanking", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "rarityScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "lastImport", void 0);
Item = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.ItemEntity, 'item')
                .select('"item"."collectionAddress"', 'collectionAddress')
                .addSelect('"item"."tokenId"', 'tokenId')
                .addSelect('"item"."title"', 'title')
                .addSelect('"item"."description"', 'description')
                .addSelect('"item"."tokenUri"', 'tokenUri')
                .addSelect('"item"."medias"', 'medias')
                .addSelect('"item"."rarityRanking"', 'rarityRanking')
                .addSelect('"item"."rarityScore"', 'rarityScore')
                .addSelect('"item"."lastImport"', 'lastImport');
        },
        name: 'items_view',
    })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.view.js.map