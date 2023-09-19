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
exports.TransferEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. ERC1155's TransferBatch)
let TransferEntity = class TransferEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], TransferEntity.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], TransferEntity.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], TransferEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], TransferEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], TransferEntity.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ItemEntity),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", String)
], TransferEntity.prototype, "tokenId", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], TransferEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TransferEntity.prototype, "timestamp", void 0);
TransferEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'transfers' }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId']),
    (0, typeorm_1.Index)(['from', 'collectionAddress', 'tokenId']),
    (0, typeorm_1.Index)(['to', 'collectionAddress', 'tokenId'])
], TransferEntity);
exports.TransferEntity = TransferEntity;
//# sourceMappingURL=Transfer.entity.js.map