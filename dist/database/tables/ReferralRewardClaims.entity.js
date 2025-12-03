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
exports.ReferralRewardClaims = exports.ClaimStatus = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const graphql_1 = require("@nestjs/graphql");
var ClaimStatus;
(function (ClaimStatus) {
    ClaimStatus["PENDING"] = "pending";
    ClaimStatus["COMPLETED"] = "completed";
    ClaimStatus["FAILED"] = "failed";
})(ClaimStatus || (exports.ClaimStatus = ClaimStatus = {}));
(0, graphql_1.registerEnumType)(ClaimStatus, {
    name: 'ClaimStatus',
});
let ReferralRewardClaims = class ReferralRewardClaims extends typeorm_1.BaseEntity {
};
exports.ReferralRewardClaims = ReferralRewardClaims;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReferralRewardClaims.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char'),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], ReferralRewardClaims.prototype, "referrerAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78 }),
    __metadata("design:type", String)
], ReferralRewardClaims.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => ClaimStatus),
    (0, typeorm_1.Column)('enum', { enum: ClaimStatus, default: ClaimStatus.PENDING }),
    __metadata("design:type", String)
], ReferralRewardClaims.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('char', { nullable: true, default: null }),
    __metadata("design:type", Object)
], ReferralRewardClaims.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReferralRewardClaims.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true, default: null }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? new Date(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], ReferralRewardClaims.prototype, "completedAt", void 0);
exports.ReferralRewardClaims = ReferralRewardClaims = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({
        name: 'referral_reward_claims',
    })
], ReferralRewardClaims);
//# sourceMappingURL=ReferralRewardClaims.entity.js.map