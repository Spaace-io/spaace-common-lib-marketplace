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
exports.SaleEntity = void 0;
const typeorm_1 = require("typeorm");
const Item_entity_1 = require("./Item.entity");
const enums_1 = require("../enums");
let SaleEntity = class SaleEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], SaleEntity.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => Item_entity_1.ItemEntity),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", String)
], SaleEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 64 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "orderHash", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], SaleEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SaleEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SaleEntity.prototype, "perUnitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], SaleEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: enums_1.Marketplace, enumName: 'marketplace' }),
    __metadata("design:type", String)
], SaleEntity.prototype, "marketplace", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SaleEntity.prototype, "timestamp", void 0);
SaleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales' }),
    (0, typeorm_1.Index)(['timestamp']),
    (0, typeorm_1.Index)(['from', 'timestamp']),
    (0, typeorm_1.Index)(['to', 'timestamp']),
    (0, typeorm_1.Index)(['collectionAddress', 'timestamp']),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'timestamp']),
    (0, typeorm_1.Index)(['orderHash'])
], SaleEntity);
exports.SaleEntity = SaleEntity;
//# sourceMappingURL=Sale.entity.js.map