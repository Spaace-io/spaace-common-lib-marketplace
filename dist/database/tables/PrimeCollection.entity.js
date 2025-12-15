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
exports.PrimeCollectionEntity = void 0;
const typeorm_1 = require("typeorm");
let PrimeCollectionEntity = class PrimeCollectionEntity extends typeorm_1.BaseEntity {
};
exports.PrimeCollectionEntity = PrimeCollectionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PrimeCollectionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], PrimeCollectionEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('numrange', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "tokenIdRange", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], PrimeCollectionEntity.prototype, "isPrime", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "volume24h", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "volume7d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "volume30d", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "volumeAllTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], PrimeCollectionEntity.prototype, "updatedAt", void 0);
exports.PrimeCollectionEntity = PrimeCollectionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'prime_collections' })
], PrimeCollectionEntity);
//# sourceMappingURL=PrimeCollection.entity.js.map