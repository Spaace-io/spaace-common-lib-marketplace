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
exports.RewardPeriod = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let RewardPeriod = class RewardPeriod extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => _1.DistributorContract),
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: _1.DistributorContract,
        enumName: 'distributor_contract',
    }),
    __metadata("design:type", String)
], RewardPeriod.prototype, "distributor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.PrimaryColumn)('timestamp without time zone', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], RewardPeriod.prototype, "startTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], RewardPeriod.prototype, "endTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], RewardPeriod.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], RewardPeriod.prototype, "distributed", void 0);
RewardPeriod = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'reward_periods' })
], RewardPeriod);
exports.RewardPeriod = RewardPeriod;
//# sourceMappingURL=RewardPeriod.entity.js.map