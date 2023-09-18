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
exports.StakingReward = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const entity_1 = require("../entity");
const class_transformer_1 = require("class-transformer");
let StakingReward = class StakingReward extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingReward.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingReward.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingReward.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], StakingReward.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingReward.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingReward.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingReward.prototype, "amount", void 0);
StakingReward = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(entity_1.StakingRewardEntity, 'reward')
                .select('"reward".*');
        },
        name: 'staking_rewards_view',
    })
], StakingReward);
exports.StakingReward = StakingReward;
//# sourceMappingURL=StakingReward.view.js.map