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
const Collection_entity_1 = require("./Collection.entity");
const __1 = require("../../..");
let ItemAttribute = class ItemAttribute {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ItemAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ItemAttribute.prototype, "value", void 0);
ItemAttribute = __decorate([
    (0, graphql_1.ObjectType)()
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
    (0, graphql_1.Field)(() => Collection_entity_1.Collection),
    (0, typeorm_1.PrimaryColumn)(String),
    (0, typeorm_1.ManyToOne)(() => Collection_entity_1.Collection, (collection) => collection.items, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'collection' }),
    __metadata("design:type", Collection_entity_1.Collection)
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
    (0, graphql_1.Field)(() => [ItemAttribute], { defaultValue: [] }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "attributes", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ItemMedia], { defaultValue: [] }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "medias", void 0);
__decorate([
    (0, graphql_1.Field)(() => [__1.Event], { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "events", void 0);
Item = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'items' })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.entity.js.map