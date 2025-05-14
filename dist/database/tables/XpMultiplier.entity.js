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
exports.XpMultiplier = exports.XpMultiplierMetadata = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const ethers_1 = require("ethers");
const class_transformer_1 = require("class-transformer");
let XpMultiplierMetadata = class XpMultiplierMetadata {
};
exports.XpMultiplierMetadata = XpMultiplierMetadata;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], XpMultiplierMetadata.prototype, "key", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], XpMultiplierMetadata.prototype, "value", void 0);
exports.XpMultiplierMetadata = XpMultiplierMetadata = __decorate([
    (0, graphql_1.ObjectType)()
], XpMultiplierMetadata);
let XpMultiplier = class XpMultiplier extends typeorm_1.BaseEntity {
};
exports.XpMultiplier = XpMultiplier;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], XpMultiplier.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], XpMultiplier.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], XpMultiplier.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 2, default: 1.0 }),
    __metadata("design:type", Number)
], XpMultiplier.prototype, "multiplier", void 0);
__decorate([
    (0, graphql_1.Field)(() => [XpMultiplierMetadata]),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], XpMultiplier.prototype, "metadata", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true, default: null }),
    __metadata("design:type", Object)
], XpMultiplier.prototype, "expiresAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], XpMultiplier.prototype, "createdAt", void 0);
exports.XpMultiplier = XpMultiplier = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'xp_multiplier' }),
    (0, typeorm_1.Index)(['userAddress', 'seasonNumber'])
], XpMultiplier);
//# sourceMappingURL=XpMultiplier.entity.js.map