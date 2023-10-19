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
exports.PassiveStakingDeposit = exports.ActiveStakingDeposit = exports.StakingDeposit = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const class_transformer_1 = require("class-transformer");
const tables_1 = require("../tables");
let StakingDeposit = class StakingDeposit extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingDeposit.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.StakingType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingDeposit.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], StakingDeposit.prototype, "depositId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], StakingDeposit.prototype, "lockTypeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], StakingDeposit.prototype, "vestingTypeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingDeposit.prototype, "shares", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], StakingDeposit.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], StakingDeposit.prototype, "timestamp", void 0);
StakingDeposit = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.StakingDepositEntity, 'deposit')
                .select('"deposit"."txHash"', 'txHash')
                .addSelect('"deposit"."logIdx"', 'logIdx')
                .addSelect('"deposit"."type"', 'type')
                .addSelect('"deposit"."pool"', 'pool')
                .addSelect('"deposit"."userAddress"', 'userAddress')
                .addSelect('"deposit"."depositId"', 'depositId')
                .addSelect('"deposit"."lockTypeId"', 'lockTypeId')
                .addSelect('"deposit"."vestingTypeId"', 'vestingTypeId')
                .addSelect('"deposit"."shares"', 'shares')
                .addSelect('"deposit"."tokens"', 'tokens')
                .addSelect('"deposit"."timestamp"', 'timestamp');
        },
        name: 'staking_deposits_view',
    })
], StakingDeposit);
exports.StakingDeposit = StakingDeposit;
let ActiveStakingDeposit = class ActiveStakingDeposit extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.StakingType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "depositId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], ActiveStakingDeposit.prototype, "lockTypeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "shares", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ActiveStakingDeposit.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ActiveStakingDeposit.prototype, "timestamp", void 0);
ActiveStakingDeposit = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.StakingDepositEntity, 'deposit')
                .where(`"deposit"."type" = '${tables_1.StakingType.ACTIVE}'`)
                .select('"deposit"."txHash"', 'txHash')
                .addSelect('"deposit"."logIdx"', 'logIdx')
                .addSelect('"deposit"."type"', 'type')
                .addSelect('"deposit"."pool"', 'pool')
                .addSelect('"deposit"."userAddress"', 'userAddress')
                .addSelect('"deposit"."depositId"', 'depositId')
                .addSelect('"deposit"."lockTypeId"', 'lockTypeId')
                .addSelect('"deposit"."shares"', 'shares')
                .addSelect('"deposit"."tokens"', 'tokens')
                .addSelect('"deposit"."timestamp"', 'timestamp');
        },
        name: 'active_staking_deposits_view',
    })
], ActiveStakingDeposit);
exports.ActiveStakingDeposit = ActiveStakingDeposit;
let PassiveStakingDeposit = class PassiveStakingDeposit extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.StakingType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "vestingTypeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "shares", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], PassiveStakingDeposit.prototype, "tokens", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], PassiveStakingDeposit.prototype, "timestamp", void 0);
PassiveStakingDeposit = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(tables_1.StakingDepositEntity, 'deposit')
                .where(`"deposit"."type" = '${tables_1.StakingType.PASSIVE}'`)
                .select('"deposit"."txHash"', 'txHash')
                .addSelect('"deposit"."logIdx"', 'logIdx')
                .addSelect('"deposit"."type"', 'type')
                .addSelect('"deposit"."pool"', 'pool')
                .addSelect('"deposit"."userAddress"', 'userAddress')
                .addSelect('"deposit"."vestingTypeId"', 'vestingTypeId')
                .addSelect('"deposit"."shares"', 'shares')
                .addSelect('"deposit"."tokens"', 'tokens')
                .addSelect('"deposit"."timestamp"', 'timestamp');
        },
        name: 'passive_staking_deposits_view',
    })
], PassiveStakingDeposit);
exports.PassiveStakingDeposit = PassiveStakingDeposit;
//# sourceMappingURL=StakingDeposit.view.js.map