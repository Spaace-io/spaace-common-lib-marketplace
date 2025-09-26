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
exports.IdentityBlacklist = void 0;
// src/moderation/identity-blacklist.entity.ts
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const IdentifierType_enum_1 = require("../enums/IdentifierType.enum");
let IdentityBlacklist = class IdentityBlacklist extends typeorm_1.BaseEntity {
};
exports.IdentityBlacklist = IdentityBlacklist;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], IdentityBlacklist.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => IdentifierType_enum_1.IdentifierType),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IdentifierType_enum_1.IdentifierType,
        enumName: 'identifier_type_enum',
    }),
    __metadata("design:type", String)
], IdentityBlacklist.prototype, "identifierType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], IdentityBlacklist.prototype, "identifierValue", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], IdentityBlacklist.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], IdentityBlacklist.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], IdentityBlacklist.prototype, "createdAt", void 0);
exports.IdentityBlacklist = IdentityBlacklist = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'identity_blacklist' }),
    (0, typeorm_1.Unique)('uq_ibl_type_value', ['identifierType', 'identifierValue']),
    (0, typeorm_1.Index)('idx_ibl_type_value', ['identifierType', 'identifierValue'])
], IdentityBlacklist);
//# sourceMappingURL=IdentityBlacklist.entity.js.map