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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const enums_1 = require("../enums");
let OrderEntity = class OrderEntity extends typeorm_1.BaseEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 })
    // No foreign key to the User entity because of aggregation of other marketplaces
    ,
    __metadata("design:type", String)
], OrderEntity.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: enums_1.OrderType, enumName: 'order_type' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: enums_1.Marketplace, enumName: 'marketplace' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "marketplace", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "perUnitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "startingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { unsigned: true }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "marketplaceFeeBps", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "marketplaceFeeReceiver", void 0);
__decorate([
    (0, typeorm_1.Column)('smallint', { unsigned: true }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "royaltiesBps", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "startingRoyalties", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "royaltiesReceiver", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], OrderEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('timestamp without time zone'),
    __metadata("design:type", Date)
], OrderEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "counter", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OrderEntity.prototype, "signature", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "zone", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "conduitKey", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "protocolAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 64, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "cancelTxHash", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "cancelLogIdx", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "cancelTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "fulfillQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "remainingQuantity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderItemEntity, (orderItemsEntity) => orderItemsEntity.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "tokens", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' }),
    (0, typeorm_1.Index)(['collectionAddress', 'startTime']) // Collection analytics & activity
    ,
    (0, typeorm_1.Index)(['userAddress', 'collectionAddress']),
    (0, typeorm_1.Index)(['userAddress', 'counter']),
    (0, typeorm_1.Index)('orders_endTime_idx', 
    // ['endTime DESC'],
    {
        synchronize: false,
    })
], OrderEntity);
//# sourceMappingURL=Order.entity.js.map