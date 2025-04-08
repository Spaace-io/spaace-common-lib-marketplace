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
exports.TokenBalanceEntity = void 0;
const typeorm_1 = require("typeorm");
let TokenBalanceEntity = class TokenBalanceEntity extends typeorm_1.BaseEntity {
};
exports.TokenBalanceEntity = TokenBalanceEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], TokenBalanceEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], TokenBalanceEntity.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], TokenBalanceEntity.prototype, "balance", void 0);
exports.TokenBalanceEntity = TokenBalanceEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'token_balances' }),
    (0, typeorm_1.Index)(['currency', 'balance']),
    (0, typeorm_1.Index)(['userAddress', 'currency', 'balance'])
], TokenBalanceEntity);
//# sourceMappingURL=TokenBalance.entity.js.map