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
exports.QuestAuditEvent = exports.QuestAuditEventPayload = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Quest_entity_1 = require("./Quest.entity");
const enums_1 = require("../enums");
const QuestAuditEvaluations_entity_1 = require("./QuestAuditEvaluations.entity");
let QuestAuditEventPayload = class QuestAuditEventPayload {
};
exports.QuestAuditEventPayload = QuestAuditEventPayload;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Raw price in wei.' }),
    __metadata("design:type", Object)
], QuestAuditEventPayload.prototype, "priceWei", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'USD price if known.' }),
    __metadata("design:type", Object)
], QuestAuditEventPayload.prototype, "usdPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'ERC20 currency address.',
    }),
    __metadata("design:type", Object)
], QuestAuditEventPayload.prototype, "currency", void 0);
exports.QuestAuditEventPayload = QuestAuditEventPayload = __decorate([
    (0, graphql_1.ObjectType)()
], QuestAuditEventPayload);
let QuestAuditEvent = class QuestAuditEvent extends typeorm_1.BaseEntity {
};
exports.QuestAuditEvent = QuestAuditEvent;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Season number (string numeric).' }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'User address (stored lowercased, without 0x).',
    }),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_entity_1.QuestTrigger, {
        description: 'Quest trigger that was processed.',
    }),
    (0, typeorm_1.Column)('enum', {
        enum: Quest_entity_1.QuestTrigger,
        enumName: 'quest_trigger',
    }),
    (0, class_validator_1.IsEnum)(Quest_entity_1.QuestTrigger),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "trigger", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { description: 'Underlying fact time.' }),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], QuestAuditEvent.prototype, "occurredAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, {
        description: 'When our service processed this event (audit created).',
    }),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuestAuditEvent.prototype, "processedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'txHash for sale-like events',
    }),
    (0, typeorm_1.Column)('char', { length: 64, nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvent.prototype, "txHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'logIdx for sale-like events',
    }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvent.prototype, "logIdx", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'order hash for listing/order events',
    }),
    (0, typeorm_1.Column)('char', { length: 64, nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvent.prototype, "orderHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], QuestAuditEvent.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.Marketplace, { nullable: true }),
    (0, typeorm_1.Column)('enum', {
        enum: enums_1.Marketplace,
        enumName: 'marketplace',
        nullable: true,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Marketplace),
    __metadata("design:type", Object)
], QuestAuditEvent.prototype, "marketplace", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestAuditEventPayload, { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { default: () => "'{}'::jsonb" }),
    (0, class_transformer_1.Type)(() => QuestAuditEventPayload),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", QuestAuditEventPayload)
], QuestAuditEvent.prototype, "payload", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvent.prototype, "durationMs", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuestAuditEvent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuestAuditEvaluations_entity_1.QuestAuditEvaluation, (e) => e.event, { cascade: false }),
    __metadata("design:type", Array)
], QuestAuditEvent.prototype, "evaluations", void 0);
exports.QuestAuditEvent = QuestAuditEvent = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'quest_audit_events' }),
    (0, typeorm_1.Index)(['userAddress', 'occurredAt', 'id'], {
        where: '"userAddress" IS NOT NULL',
    }),
    (0, typeorm_1.Index)(['userAddress', 'processedAt', 'id'], {
        where: '"userAddress" IS NOT NULL',
    }),
    (0, typeorm_1.Index)(['txHash', 'logIdx'], {
        where: '"txHash" IS NOT NULL AND "logIdx" IS NOT NULL',
    }),
    (0, typeorm_1.Index)(['orderHash'], { where: '"orderHash" IS NOT NULL' })
], QuestAuditEvent);
//# sourceMappingURL=QuestAuditEvent.entity.js.map