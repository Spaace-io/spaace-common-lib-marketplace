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
exports.ModerationAudit = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const ModerationAction_enum_1 = require("../enums/ModerationAction.enum");
let ModerationAudit = class ModerationAudit extends typeorm_1.BaseEntity {
};
exports.ModerationAudit = ModerationAudit;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], ModerationAudit.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => ModerationAction_enum_1.ModerationAction),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ModerationAction_enum_1.ModerationAction,
        enumName: 'moderation_action_enum',
    }),
    __metadata("design:type", String)
], ModerationAudit.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ModerationAudit.prototype, "wallet", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ModerationAudit.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ModerationAudit.prototype, "actedBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', name: 'created_at' }),
    __metadata("design:type", Date)
], ModerationAudit.prototype, "createdAt", void 0);
exports.ModerationAudit = ModerationAudit = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'moderation_audit' }),
    (0, typeorm_1.Index)('idx_mod_audit_action', ['action', 'createdAt'])
], ModerationAudit);
//# sourceMappingURL=ModerationAudit.entity.js.map