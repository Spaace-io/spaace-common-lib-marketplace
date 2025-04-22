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
exports.StakingHarvest = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
let StakingHarvest = class StakingHarvest extends typeorm_1.BaseEntity {
};
exports.StakingHarvest = StakingHarvest;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingHarvest.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingHarvest.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingHarvest.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingHarvest.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingHarvest.prototype, "depositId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingHarvest.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingHarvest.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], StakingHarvest.prototype, "timestamp", void 0);
exports.StakingHarvest = StakingHarvest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.StakingHarvestEntity, 'harvest')
                .select('"harvest"."txHash"', 'txHash')
                .addSelect('"harvest"."logIdx"', 'logIdx')
                .addSelect('"harvest"."userAddress"', 'userAddress')
                .addSelect('"harvest"."pool"', 'pool')
                .addSelect('"harvest"."depositId"', 'depositId')
                .addSelect('"harvest"."token"', 'token')
                .addSelect('"harvest"."amount"', 'amount')
                .addSelect('"harvest"."timestamp"', 'timestamp');
        },
        name: 'staking_harvests_view',
    })
], StakingHarvest);
//# sourceMappingURL=StakingHarvest.view.js.map