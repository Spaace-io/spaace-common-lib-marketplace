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
let ItemAttribute = class ItemAttribute extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => Item),
    (0, typeorm_1.JoinColumn)([
        { name: 'collection', referencedColumnName: 'collection' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", String)
], ItemAttribute.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], ItemAttribute.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ItemAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(),
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
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ItemMedia.prototype, "raw", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ItemMedia.prototype, "thumbnail", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ItemMedia.prototype, "gateway", void 0);
ItemMedia = __decorate([
    (0, graphql_1.ObjectType)()
], ItemMedia);
exports.ItemMedia = ItemMedia;
let Item = class Item extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => __1.Collection),
    (0, typeorm_1.JoinColumn)({ name: 'collection', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], Item.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Item.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "tokenUri", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItemMedia], { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "rarityRanking", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 19, unsigned: true, nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "rarityScore", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Item.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItemAttribute], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => ItemAttribute, (attribute) => [attribute.collection, attribute.tokenId]),
    __metadata("design:type", Array)
], Item.prototype, "attributes", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.CollectionType),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => __2.Order, { nullable: true }),
    __metadata("design:type", __2.Order)
], Item.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __2.Order, { nullable: true }),
    __metadata("design:type", __2.Order)
], Item.prototype, "sellNow", void 0);
Item = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'items' })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.entity.js.map