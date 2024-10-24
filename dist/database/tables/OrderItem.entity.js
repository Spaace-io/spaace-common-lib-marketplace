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
exports.OrderItemEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let OrderItemEntity = class OrderItemEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], OrderItemEntity.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], OrderItemEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ItemEntity),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", Object)
], OrderItemEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.OrderEntity, (order) => order.tokens, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", _1.OrderEntity)
], OrderItemEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.ItemEntity, (itemEntity) => itemEntity.tokenId, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", _1.ItemEntity)
], OrderItemEntity.prototype, "itemEntity", void 0);
OrderItemEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders_items' }),
    (0, typeorm_1.Index)(['hash']),
    (0, typeorm_1.Index)(['hash', 'collectionAddress']),
    (0, typeorm_1.Index)(['hash', 'collectionAddress', 'tokenId'])
], OrderItemEntity);
exports.OrderItemEntity = OrderItemEntity;
//# sourceMappingURL=OrderItem.entity.js.map