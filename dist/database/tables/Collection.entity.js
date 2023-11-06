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
exports.CollectionEntity = exports.CollectionLink = exports.CollectionLinkType = exports.CollectionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
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
    CollectionLinkType["CUSTOM"] = "CUSTOM";
    CollectionLinkType["TWITTER"] = "TWITTER";
    CollectionLinkType["DISCORD"] = "DISCORD";
    CollectionLinkType["INSTAGRAM"] = "INSTAGRAM";
    CollectionLinkType["TELEGRAM"] = "TELEGRAM";
    CollectionLinkType["MEDIUM"] = "MEDIUM";
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
let CollectionEntity = class CollectionEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], CollectionEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: CollectionType, enumName: 'collection_type' }),
    __metadata("design:type", String)
], CollectionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", Object)
], CollectionEntity.prototype, "decimals", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], CollectionEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], CollectionEntity.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], CollectionEntity.prototype, "explicit", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "bannerUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "deployedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "deployer", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], CollectionEntity.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], CollectionEntity.prototype, "lastImport", void 0);
CollectionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'collections' })
], CollectionEntity);
exports.CollectionEntity = CollectionEntity;
//# sourceMappingURL=Collection.entity.js.map