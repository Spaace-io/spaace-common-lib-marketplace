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
exports.CollectionVolume = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Sale_entity_1 = require("./Sale.entity");
const __1 = require("../../..");
const ethers_1 = require("ethers");
const Collection_entity_1 = require("./Collection.entity");
function getVolumeQuery(interval) {
    return (query) => query.fromDummy().select(`COALESCE(${query
        .subQuery()
        .from(Sale_entity_1.SaleEntity, 'sale')
        .select('SUM("sale"."price")')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`);
}
function getVolumeChangeQuery(interval) {
    return (query) => query.fromDummy().select(`COALESCE(${query
        .subQuery()
        .from(Sale_entity_1.SaleEntity, 'sale')
        .select(`${getVolumeQuery(interval)(query.subQuery()).getQuery()} - SUM("sale"."price")`)
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
        .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`);
}
let CollectionVolume = class CollectionVolume extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionVolume.prototype, "volume", void 0);
CollectionVolume = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(Collection_entity_1.CollectionEntity, 'collection')
                .select('"collection"."address"')
                .addSelect(getVolumeQuery('1 hour'), 'volume1h')
                .addSelect(getVolumeChangeQuery('1 hour'), 'volumeChange1h')
                .addSelect(getVolumeQuery('6 hours'), 'volume6h')
                .addSelect(getVolumeChangeQuery('6 hours'), 'volumeChange6h')
                .addSelect(getVolumeQuery('1 day'), 'volume24h')
                .addSelect(getVolumeChangeQuery('1 day'), 'volumeChange24h')
                .addSelect(getVolumeQuery('7 days'), 'volume7d')
                .addSelect(getVolumeChangeQuery('7 days'), 'volumeChange7d')
                .addSelect(getVolumeChangeQuery('30 days'), 'volumeChange30d')
                .addSelect(getVolumeQuery('30 days'), 'volume30d')
                .addSelect((query) => query
                .from(Sale_entity_1.SaleEntity, 'sale')
                .select('SUM("sale"."price")')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`), 'volume');
        },
        name: 'collection_volumes',
        materialized: true,
    }),
    (0, typeorm_1.Index)(['volume1h']),
    (0, typeorm_1.Index)(['volumeChange1h']),
    (0, typeorm_1.Index)(['volume6h']),
    (0, typeorm_1.Index)(['volumeChange6h']),
    (0, typeorm_1.Index)(['volume24h']),
    (0, typeorm_1.Index)(['volumeChange24h']),
    (0, typeorm_1.Index)(['volume7d']),
    (0, typeorm_1.Index)(['volumeChange7d']),
    (0, typeorm_1.Index)(['volume30d']),
    (0, typeorm_1.Index)(['volumeChange30d']),
    (0, typeorm_1.Index)(['volume'])
], CollectionVolume);
exports.CollectionVolume = CollectionVolume;
//# sourceMappingURL=CollectionVolume.view.js.map