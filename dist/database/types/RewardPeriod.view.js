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
const tables_1 = require("../tables");
let RewardPeriod = class RewardPeriod extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => tables_1.DistributorContract),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], RewardPeriod.prototype, "distributor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], RewardPeriod.prototype, "startTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], RewardPeriod.prototype, "endTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], RewardPeriod.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], RewardPeriod.prototype, "distributed", void 0);
RewardPeriod = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.RewardPeriodEntity, 'period')
                .select('"period"."distributor"', 'distributor')
                .addSelect('"period"."startTime"', 'startTime')
                .addSelect('"period"."endTime"', 'endTime')
                .addSelect('"period"."amount"', 'amount')
                .addSelect('"period"."distributed"', 'distributed');
        },
        name: 'reward_periods_view',
    })
], RewardPeriod);
exports.RewardPeriod = RewardPeriod;
//# sourceMappingURL=RewardPeriod.view.js.map