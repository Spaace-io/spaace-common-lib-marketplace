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
exports.TokenTransferEntity = void 0;
const typeorm_1 = require("typeorm");
let TokenTransferEntity = class TokenTransferEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], TokenTransferEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TokenTransferEntity.prototype, "timestamp", void 0);
TokenTransferEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'token_transfers' }),
    (0, typeorm_1.Index)(['timestamp'])
], TokenTransferEntity);
exports.TokenTransferEntity = TokenTransferEntity;
//# sourceMappingURL=TokenTransfer.entity.js.map