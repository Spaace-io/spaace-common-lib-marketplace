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
exports.PassiveStakingDepositEntity = exports.ActiveStakingDepositEntity = exports.StakingDepositEntity = exports.StakingType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var StakingType;
(function (StakingType) {
    StakingType["PASSIVE"] = "PASSIVE";
    StakingType["ACTIVE"] = "ACTIVE";
})(StakingType || (exports.StakingType = StakingType = {}));
(0, graphql_1.registerEnumType)(StakingType, {
    name: 'StakingType',
});
let StakingDepositEntity = class StakingDepositEntity extends typeorm_1.BaseEntity {
};
exports.StakingDepositEntity = StakingDepositEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: StakingType, enumName: 'staking_type' }),
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "pool", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78 }) // Negative for withdrawals
    ,
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "shares", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78 }) // Negative for withdrawals
    ,
    __metadata("design:type", String)
], StakingDepositEntity.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], StakingDepositEntity.prototype, "timestamp", void 0);
exports.StakingDepositEntity = StakingDepositEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'staking_deposits' }),
    (0, typeorm_1.TableInheritance)({ column: { name: 'type' } }),
    (0, typeorm_1.Index)(['pool', 'userAddress', 'timestamp']),
    (0, typeorm_1.Index)(['userAddress', 'timestamp'])
], StakingDepositEntity);
let ActiveStakingDepositEntity = class ActiveStakingDepositEntity extends StakingDepositEntity {
};
exports.ActiveStakingDepositEntity = ActiveStakingDepositEntity;
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], ActiveStakingDepositEntity.prototype, "depositId", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }) // Null for withdrawals
    ,
    __metadata("design:type", Object)
], ActiveStakingDepositEntity.prototype, "lockTypeId", void 0);
exports.ActiveStakingDepositEntity = ActiveStakingDepositEntity = __decorate([
    (0, typeorm_1.ChildEntity)(StakingType.ACTIVE)
], ActiveStakingDepositEntity);
let PassiveStakingDepositEntity = class PassiveStakingDepositEntity extends StakingDepositEntity {
};
exports.PassiveStakingDepositEntity = PassiveStakingDepositEntity;
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], PassiveStakingDepositEntity.prototype, "vestingTypeId", void 0);
exports.PassiveStakingDepositEntity = PassiveStakingDepositEntity = __decorate([
    (0, typeorm_1.ChildEntity)(StakingType.PASSIVE)
], PassiveStakingDepositEntity);
//# sourceMappingURL=StakingDeposit.entity.js.map