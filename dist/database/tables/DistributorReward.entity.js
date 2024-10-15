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
exports.DistributorRewardEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
let DistributorRewardEntity = class DistributorRewardEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], DistributorRewardEntity.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: enums_1.DistributorContract,
        enumName: 'distributor_contract',
    }),
    __metadata("design:type", String)
], DistributorRewardEntity.prototype, "distributor", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], DistributorRewardEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DistributorRewardEntity.prototype, "signature", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DistributorRewardEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 64, nullable: true }),
    __metadata("design:type", Object)
], DistributorRewardEntity.prototype, "harvestTxHash", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], DistributorRewardEntity.prototype, "harvestLogIdx", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], DistributorRewardEntity.prototype, "harvestTimestamp", void 0);
DistributorRewardEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'distributor_rewards' }),
    (0, typeorm_1.Index)(['userAddress', 'distributor', 'amount'], {
        where: '"harvestTimestamp" IS NULL',
    }),
    (0, typeorm_1.Index)(['userAddress', 'distributor', 'amount'], {
        where: '"harvestTimestamp" IS NOT NULL',
    })
], DistributorRewardEntity);
exports.DistributorRewardEntity = DistributorRewardEntity;
//# sourceMappingURL=DistributorReward.entity.js.map