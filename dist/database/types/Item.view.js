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
const Order_view_1 = require("./Order.view");
const Sale_view_1 = require("./Sale.view");
const Transfer_view_1 = require("./Transfer.view");
const __1 = require("../..");
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
            return (dataSource
                .createQueryBuilder()
                .from(tables_1.ItemEntity, 'item')
                .leftJoin((q) => q
                .from(Order_view_1.Order, 'order')
                .select()
                .where(`"order"."type" IN ('${tables_1.OrderType.ASK}', '${tables_1.OrderType.DUTCH_AUCTION}')`)
                .andWhere(`"order"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere('"order"."active"')
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy(`CASE WHEN "order"."type" = '${tables_1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END`, 'ASC'), 'buyNow', '"buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(Order_view_1.Order, 'order')
                .select()
                .where(`"order"."type" = '${tables_1.OrderType.BID}'`)
                .andWhere(`"order"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere('"order"."active"')
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."price"', 'DESC'), 'sellNow', '"sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)')
                .leftJoin((q) => q
                .from(Order_view_1.Order, 'order')
                .select()
                .where(`"order"."type" = '${tables_1.OrderType.ENGLISH_AUCTION}'`)
                .andWhere(`"order"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere('"order"."active"')
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
            'auction', '"auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(Sale_view_1.Sale, 'sale')
                .select()
                .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
                .orderBy('"sale"."collectionAddress"')
                .addOrderBy('"sale"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastSale', '"lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(Transfer_view_1.Transfer, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'ASC'), 'mint', '"mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(Transfer_view_1.Transfer, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastTransfer', '"lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId"')
                .select('"item"."collectionAddress"', 'collectionAddress')
                .addSelect('"item"."tokenId"', 'tokenId')
                .addSelect('"item"."title"', 'title')
                .addSelect('"item"."description"', 'description')
                .addSelect('"item"."tokenUri"', 'tokenUri')
                .addSelect('"item"."medias"', 'medias')
                .addSelect('"item"."rarityRanking"', 'rarityRanking')
                .addSelect('"item"."rarityScore"', 'rarityScore')
                .addSelect('"item"."lastImport"', 'lastImport')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect(`CASE WHEN "buyNow"."type" = '${tables_1.OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END`, 'buyNowPrice')
                .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
                .addSelect('"sellNow"."price"', 'sellNowPrice')
                .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
                .addSelect('"auction"."endTime"', 'auctionEndTime')
                .addSelect('"lastSale"."price"', 'lastSalePrice')
                .addSelect('"lastSale"."timestamp"', 'lastSaleTimestamp')
                .addSelect('"mint"."timestamp"', 'mintTimestamp')
                .addSelect('"lastTransfer"."timestamp"', 'lastTransferTimestamp')
                .addSelect((q) => q
                .from(tables_1.Like, 'like')
                .select('COUNT(*)')
                .where('"like"."collectionAddress" = "item"."collectionAddress"')
                .andWhere('"like"."tokenId" = "item"."tokenId"'), 'likeCount')
                // Some LEFT JOINs could return several rows, so we deduplicate results here
                .distinctOn(['"item"."collectionAddress"', '"item"."tokenId"'])
                .orderBy('"item"."collectionAddress"')
                .addOrderBy('"item"."tokenId"')
                .addOrderBy('"sellNow"."price"', 'DESC'));
        },
        name: 'items_view',
    })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.view.js.map