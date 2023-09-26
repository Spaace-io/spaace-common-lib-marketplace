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
exports.OrderEntity = exports.OrderType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const utils = require("../../utils");
const ethers_1 = require("ethers");
var OrderType;
(function (OrderType) {
    OrderType["ASK"] = "ASK";
    OrderType["BID"] = "BID";
    OrderType["ENGLISH_AUCTION"] = "ENGLISH_AUCTION";
    OrderType["DUTCH_AUCTION"] = "DUTCH_AUCTION";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
(0, graphql_1.registerEnumType)(OrderType, {
    name: 'OrderType',
});
let OrderEntity = class OrderEntity extends typeorm_1.BaseEntity {
};
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
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ItemEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", Object)
], OrderEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: OrderType, enumName: 'order_type' }),
    __metadata("design:type", String)
], OrderEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "startingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], OrderEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
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
OrderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'endTime'], {
        where: `"type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}') AND "cancelTimestamp" IS NULL AND "currency" IN ('${utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'endTime'], {
        where: `"type" = '${OrderType.BID}' AND "cancelTimestamp" IS NULL AND "currency" IN ('${utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'endTime'], {
        where: `"type" = '${OrderType.ENGLISH_AUCTION}' AND "cancelTimestamp" IS NULL AND "currency" IN ('${utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'counter'])
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=Order.entity.js.map