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
exports.DistributorReward = exports.DistributorContract = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
var DistributorContract;
(function (DistributorContract) {
    DistributorContract["TRADING_REWARDS"] = "Trading";
    DistributorContract["REFERRAL_REWARDS"] = "Referral";
    DistributorContract["LOYALTY_REWARDS"] = "Loyalty";
})(DistributorContract = exports.DistributorContract || (exports.DistributorContract = {}));
(0, graphql_1.registerEnumType)(DistributorContract, {
    name: 'DistributorContract',
});
let DistributorReward = class DistributorReward extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], DistributorReward.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => DistributorContract),
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: DistributorContract,
        enumName: 'distributor_contract',
    }),
    __metadata("design:type", String)
], DistributorReward.prototype, "distributor", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], DistributorReward.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true }), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], DistributorReward.prototype, "signature", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], DistributorReward.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('char', { length: 64, nullable: true }),
    (0, class_transformer_1.Transform)(({ value }) => value !== null
        ? ethers_1.ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null, {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], DistributorReward.prototype, "harvestTxHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], DistributorReward.prototype, "harvestLogIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], DistributorReward.prototype, "harvestTimestamp", void 0);
DistributorReward = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'distributor_rewards' })
], DistributorReward);
exports.DistributorReward = DistributorReward;
//# sourceMappingURL=DistributorReward.entity.js.map