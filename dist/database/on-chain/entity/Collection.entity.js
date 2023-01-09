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
exports.Collection = exports.CollectionFloor = exports.CollectionVolume = exports.CollectionAttribute = exports.CollectionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const __1 = require("../..");
var CollectionType;
(function (CollectionType) {
    CollectionType["ERC721"] = "ERC721";
    CollectionType["ERC1155"] = "ERC1155";
})(CollectionType = exports.CollectionType || (exports.CollectionType = {}));
(0, graphql_1.registerEnumType)(CollectionType, {
    name: 'CollectionType',
});
let CollectionAttribute = class CollectionAttribute {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CollectionAttribute.prototype, "count", void 0);
CollectionAttribute = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionAttribute);
exports.CollectionAttribute = CollectionAttribute;
let CollectionVolume = class CollectionVolume {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "change24h", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "change7d", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "change30d", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume", void 0);
CollectionVolume = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionVolume);
exports.CollectionVolume = CollectionVolume;
let CollectionFloor = class CollectionFloor {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionFloor.prototype, "floorPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionFloor.prototype, "floorChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionFloor.prototype, "floorChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CollectionFloor.prototype, "floorChange30d", void 0);
CollectionFloor = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionFloor);
exports.CollectionFloor = CollectionFloor;
let Collection = class Collection extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => CollectionType),
    (0, typeorm_1.Column)('enum', { enum: CollectionType, enumName: 'collection_type' }),
    __metadata("design:type", String)
], Collection.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Collection.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Collection.prototype, "explicit", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Collection.prototype, "deployedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "deployer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CollectionAttribute], { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Collection.prototype, "attributes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Collection.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Collection.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", __1.Order)
], Collection.prototype, "buyNow", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.Order, { nullable: true }),
    __metadata("design:type", __1.Order)
], Collection.prototype, "sellNow", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", CollectionVolume)
], Collection.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", CollectionFloor)
], Collection.prototype, "floor", void 0);
Collection = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'collections' })
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.entity.js.map