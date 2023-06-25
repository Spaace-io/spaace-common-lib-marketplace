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
exports.Collection = exports.CollectionAttribute = exports.CollectionAttributeValue = exports.CollectionLink = exports.CollectionLinkType = exports.CollectionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const __1 = require("../..");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
var CollectionType;
(function (CollectionType) {
    CollectionType["ERC721"] = "ERC721";
    CollectionType["ERC1155"] = "ERC1155";
})(CollectionType = exports.CollectionType || (exports.CollectionType = {}));
(0, graphql_1.registerEnumType)(CollectionType, {
    name: 'CollectionType',
});
var CollectionLinkType;
(function (CollectionLinkType) {
    CollectionLinkType["CUSTOM"] = "custom";
    CollectionLinkType["TWITTER"] = "twitter";
    CollectionLinkType["DISCORD"] = "discord";
    CollectionLinkType["INSTAGRAM"] = "instagram";
    CollectionLinkType["TELEGRAM"] = "telegram";
    CollectionLinkType["MEDIUM"] = "medium";
    // WIKI, CHAT
})(CollectionLinkType = exports.CollectionLinkType || (exports.CollectionLinkType = {}));
(0, graphql_1.registerEnumType)(CollectionLinkType, {
    name: 'CollectionLinkType',
});
let CollectionLink = class CollectionLink {
};
__decorate([
    (0, graphql_1.Field)(() => CollectionLinkType),
    __metadata("design:type", String)
], CollectionLink.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionLink.prototype, "url", void 0);
CollectionLink = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionLink);
exports.CollectionLink = CollectionLink;
let CollectionAttributeValue = class CollectionAttributeValue {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttributeValue.prototype, "count", void 0);
CollectionAttributeValue = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionAttributeValue);
exports.CollectionAttributeValue = CollectionAttributeValue;
let CollectionAttribute = class CollectionAttribute {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CollectionAttributeValue]),
    __metadata("design:type", Array)
], CollectionAttribute.prototype, "values", void 0);
CollectionAttribute = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionAttribute);
exports.CollectionAttribute = CollectionAttribute;
let Collection = class Collection extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => CollectionType),
    (0, typeorm_1.Column)('enum', { enum: CollectionType, enumName: 'collection_type' }),
    __metadata("design:type", String)
], Collection.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Collection.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "explicit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "deployedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], Collection.prototype, "deployer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CollectionAttribute], { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "attributes", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CollectionLink]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], Collection.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Collection.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "floorPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "floorChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "floorChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "floorChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "floorChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "floorChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "saleCount30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Collection.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Collection.prototype, "listedCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "sellNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Collection.prototype, "notable", void 0);
Collection = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'collections' })
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.entity.js.map