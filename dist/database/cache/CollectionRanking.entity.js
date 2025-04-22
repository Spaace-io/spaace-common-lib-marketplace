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
exports.CollectionRankingCached = CollectionRankingCached;
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
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume90d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousVolume90d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "floorPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], CollectionRankingCached.prototype, "previousFloorPrice90d", void 0);
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
], CollectionRankingCached.prototype, "saleCount90d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount1h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount6h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "previousSaleCount90d", void 0);
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
exports.CollectionRankingCached = CollectionRankingCached = __decorate([
    (0, typeorm_1.Entity)({ name: 'collection_rankings_cache' }),
    (0, typeorm_1.Index)(['address'], { unique: true })
], CollectionRankingCached);
//# sourceMappingURL=CollectionRanking.entity.js.map