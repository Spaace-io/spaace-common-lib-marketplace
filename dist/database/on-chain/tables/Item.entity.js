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
exports.ItemEntity = exports.ItemMedia = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
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
let ItemEntity = class ItemEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], ItemEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], ItemEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "tokenUri", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "medias", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "rarityRanking", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "rarityScore", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], ItemEntity.prototype, "lastImport", void 0);
ItemEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'items' }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId'], { unique: true })
], ItemEntity);
exports.ItemEntity = ItemEntity;
//# sourceMappingURL=Item.entity.js.map