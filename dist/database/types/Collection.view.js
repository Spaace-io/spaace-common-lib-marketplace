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
exports.Collection = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const ethers_1 = require("ethers");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let Collection = class Collection extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.CollectionType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "explicit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "deployedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], Collection.prototype, "deployer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [__1.CollectionLink]),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Type)(() => __1.CollectionLink),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Collection.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "floorChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "listedCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "notable", void 0);
Collection = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.CollectionEntity, 'collection')
                .leftJoin(__1.CollectionRanking, 'ranking', '"ranking"."address" = "collection"."address"')
                .select('"collection"."address"', 'address')
                .addSelect('"collection"."type"', 'type')
                .addSelect('"collection"."name"', 'name')
                .addSelect('"collection"."symbol"', 'symbol')
                .addSelect('"collection"."imageUrl"', 'imageUrl')
                .addSelect('"collection"."active"', 'active')
                .addSelect('"collection"."verified"', 'verified')
                .addSelect('"collection"."explicit"', 'explicit')
                .addSelect('"collection"."bannerUrl"', 'bannerUrl')
                .addSelect('"collection"."description"', 'description')
                .addSelect('"collection"."deployedAt"', 'deployedAt')
                .addSelect('"collection"."deployer"', 'deployer')
                .addSelect('"collection"."links"', 'links')
                .addSelect('"collection"."lastImport"', 'lastImport')
                .addSelect('COALESCE("ranking"."volume", 0)', 'volume')
                .addSelect('COALESCE("ranking"."volume1h", 0)', 'volume1h')
                .addSelect('COALESCE("ranking"."volume6h", 0)', 'volume6h')
                .addSelect('COALESCE("ranking"."volume24h", 0)', 'volume24h')
                .addSelect('COALESCE("ranking"."volume7d", 0)', 'volume7d')
                .addSelect('COALESCE("ranking"."volume30d", 0)', 'volume30d')
                .addSelect('COALESCE("ranking"."volumeChange1h", 0)', 'volumeChange1h')
                .addSelect('COALESCE("ranking"."volumeChange6h", 0)', 'volumeChange6h')
                .addSelect('COALESCE("ranking"."volumeChange24h", 0)', 'volumeChange24h')
                .addSelect('COALESCE("ranking"."volumeChange7d", 0)', 'volumeChange7d')
                .addSelect('COALESCE("ranking"."volumeChange30d", 0)', 'volumeChange30d')
                .addSelect('COALESCE("ranking"."floorPrice", 0)', 'floorPrice')
                .addSelect('COALESCE("ranking"."floorChange1h", 0)', 'floorChange1h')
                .addSelect('COALESCE("ranking"."floorChange6h", 0)', 'floorChange6h')
                .addSelect('COALESCE("ranking"."floorChange24h", 0)', 'floorChange24h')
                .addSelect('COALESCE("ranking"."floorChange7d", 0)', 'floorChange7d')
                .addSelect('COALESCE("ranking"."floorChange30d", 0)', 'floorChange30d')
                .addSelect('COALESCE("ranking"."saleCount", 0)', 'saleCount')
                .addSelect('COALESCE("ranking"."saleCount1h", 0)', 'saleCount1h')
                .addSelect('COALESCE("ranking"."saleCount6h", 0)', 'saleCount6h')
                .addSelect('COALESCE("ranking"."saleCount24h", 0)', 'saleCount24h')
                .addSelect('COALESCE("ranking"."saleCount7d", 0)', 'saleCount7d')
                .addSelect('COALESCE("ranking"."saleCount30d", 0)', 'saleCount30d')
                .addSelect('COALESCE("ranking"."totalSupply", 0)', 'totalSupply')
                .addSelect('COALESCE("ranking"."ownerCount", 0)', 'ownerCount')
                .addSelect('COALESCE("ranking"."listedCount", 0)', 'listedCount')
                .addSelect((query) => query
                .fromDummy()
                .select(`EXISTS ${query
                .subQuery()
                .select('1')
                .from(__1.NotableCollection, 'notable')
                .where('"notable"."collectionAddress" = "collection"."address"')
                .getQuery()}`), 'notable');
        },
        name: 'collections_view',
    })
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.view.js.map