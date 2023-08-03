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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const _1 = require(".");
const class_validator_1 = require("class-validator");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "biography", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    (0, typeorm_1.ManyToOne)(() => User_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'referrerAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "referrerAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], User.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "loyaltyRewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "loyaltyRewardsClaimed", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.SeasonRank, { nullable: true }),
    (0, class_transformer_1.Type)(() => _1.SeasonRank),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], User.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_1, { nullable: true }),
    (0, class_transformer_1.Type)(() => User_1),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], User.prototype, "referrer", void 0);
User = User_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=User.entity.js.map