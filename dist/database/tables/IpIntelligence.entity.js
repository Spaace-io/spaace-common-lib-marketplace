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
exports.IpIntelligence = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let IpIntelligence = class IpIntelligence extends typeorm_1.BaseEntity {
};
exports.IpIntelligence = IpIntelligence;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 45 }),
    __metadata("design:type", String)
], IpIntelligence.prototype, "ipAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], IpIntelligence.prototype, "totalUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], IpIntelligence.prototype, "activeUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], IpIntelligence.prototype, "bannedUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 20, nullable: true }),
    __metadata("design:type", Object)
], IpIntelligence.prototype, "ipType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 10, nullable: true }),
    __metadata("design:type", Object)
], IpIntelligence.prototype, "countryCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], IpIntelligence.prototype, "riskScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], IpIntelligence.prototype, "isBlacklisted", void 0);
exports.IpIntelligence = IpIntelligence = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'ip_intelligence' }),
    (0, typeorm_1.Index)(['riskScore']),
    (0, typeorm_1.Index)(['totalUsers']),
    (0, typeorm_1.Index)(['isBlacklisted'], { where: '"isBlacklisted" = true' }),
    (0, typeorm_1.Index)(['ipType']),
    (0, typeorm_1.Index)(['countryCode'])
], IpIntelligence);
//# sourceMappingURL=IpIntelligence.entity.js.map