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
exports.StakingRewardEntity = void 0;
const typeorm_1 = require("typeorm");
let StakingRewardEntity = class StakingRewardEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], StakingRewardEntity.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], StakingRewardEntity.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingRewardEntity.prototype, "pool", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, nullable: true }),
    __metadata("design:type", Object)
], StakingRewardEntity.prototype, "vestingTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingRewardEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], StakingRewardEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], StakingRewardEntity.prototype, "timestamp", void 0);
StakingRewardEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'staking_rewards' }),
    (0, typeorm_1.Index)(['pool', 'token', 'timestamp'])
], StakingRewardEntity);
exports.StakingRewardEntity = StakingRewardEntity;
//# sourceMappingURL=StakingReward.entity.js.map