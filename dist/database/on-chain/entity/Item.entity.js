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
exports.Item = exports.ItemMedia = exports.ItemAttribute = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const __1 = require("..");
const __2 = require("../..");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
let ItemAttribute = class ItemAttribute extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => Item),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ItemAttribute.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], ItemAttribute.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ItemAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ItemAttribute.prototype, "value", void 0);
ItemAttribute = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'item_attributes' })
], ItemAttribute);
exports.ItemAttribute = ItemAttribute;
let ItemMedia = class ItemMedia {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItemMedia.prototype, "raw", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItemMedia.prototype, "thumbnail", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ItemMedia.prototype, "gateway", void 0);
ItemMedia = __decorate([
    (0, graphql_1.ObjectType)()
], ItemMedia);
exports.ItemMedia = ItemMedia;
let Item = class Item extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => __1.Collection),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Item.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Item.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "tokenUri", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItemMedia], { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "rarityRanking", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('float', { unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "rarityScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItemAttribute], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => ItemAttribute, (attribute) => [attribute.collectionAddress, attribute.tokenId]),
    __metadata("design:type", Object)
], Item.prototype, "attributes", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Collection),
    __metadata("design:type", __1.Collection)
], Item.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(() => __2.Order, { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __2.Order, { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "sellNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Sale, { nullable: true }),
    __metadata("design:type", Object)
], Item.prototype, "lastSale", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Item.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [__1.Balance], { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "owners", void 0);
Item = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'items' })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.entity.js.map