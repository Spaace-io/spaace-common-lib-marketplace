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
exports.RewardPeriodEntity = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let RewardPeriodEntity = class RewardPeriodEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: _1.DistributorContract,
        enumName: 'distributor_contract',
    }),
    __metadata("design:type", String)
], RewardPeriodEntity.prototype, "distributor", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('timestamp without time zone', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], RewardPeriodEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], RewardPeriodEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], RewardPeriodEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], RewardPeriodEntity.prototype, "distributed", void 0);
RewardPeriodEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'reward_periods' })
], RewardPeriodEntity);
exports.RewardPeriodEntity = RewardPeriodEntity;
//# sourceMappingURL=RewardPeriod.entity.js.map