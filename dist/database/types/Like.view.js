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
exports.Like = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
let Like = class Like extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Like.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Like.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Like.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => value === ethers_1.BigNumber.from(2).pow(256).toString() ? null : value, {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Like.prototype, "tokenId", void 0);
Like = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from(__1.LikeEntity, 'like')
                .select('"like"."id"', 'id')
                .addSelect('"like"."userAddress"', 'userAddress')
                .addSelect('"like"."collectionAddress"', 'collectionAddress')
                .addSelect('"like"."tokenId"', 'tokenId')
                // Used for searching in collection fields
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."description"')
                .where('"collection"."address" = "like"."collectionAddress"'), 'description')
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."name"')
                .where('"collection"."address" = "like"."collectionAddress"'), 'name')
                // Used for searching in item fields
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."title"')
                .where('"item"."collectionAddress" = "like"."collectionAddress"')
                .andWhere('"item"."tokenId" = "like"."tokenId"'), 'title')
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."description"')
                .where('"item"."collectionAddress" = "like"."collectionAddress"')
                .andWhere('"item"."tokenId" = "like"."tokenId"'), 'itemDescription'));
        },
        name: 'likes_view',
    })
], Like);
exports.Like = Like;
//# sourceMappingURL=Like.view.js.map