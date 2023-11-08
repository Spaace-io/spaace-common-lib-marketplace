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
exports.CollectionRankingCached = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
let CollectionRankingCached = class CollectionRankingCached extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => __1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "floorPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "totalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "ownerCount", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "listedCount", void 0);
CollectionRankingCached = __decorate([
    (0, typeorm_1.Entity)({ name: 'collection_rankings_cache' }),
    (0, typeorm_1.Index)(['address'], { unique: true }),
    (0, typeorm_1.Index)(['volume']),
    (0, typeorm_1.Index)(['volume1h']),
    (0, typeorm_1.Index)(['volume6h']),
    (0, typeorm_1.Index)(['volume24h']),
    (0, typeorm_1.Index)(['volume7d']),
    (0, typeorm_1.Index)(['volume30d']),
    (0, typeorm_1.Index)(['volumeChange1h']),
    (0, typeorm_1.Index)(['volumeChange6h']),
    (0, typeorm_1.Index)(['volumeChange24h']),
    (0, typeorm_1.Index)(['volumeChange7d']),
    (0, typeorm_1.Index)(['volumeChange30d']),
    (0, typeorm_1.Index)(['floorPrice']),
    (0, typeorm_1.Index)(['floorChange1h']),
    (0, typeorm_1.Index)(['floorChange6h']),
    (0, typeorm_1.Index)(['floorChange24h']),
    (0, typeorm_1.Index)(['floorChange7d']),
    (0, typeorm_1.Index)(['floorChange30d'])
], CollectionRankingCached);
exports.CollectionRankingCached = CollectionRankingCached;
//# sourceMappingURL=CollectionRanking.entity.js.map