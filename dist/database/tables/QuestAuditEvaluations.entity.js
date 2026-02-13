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
exports.QuestAuditEvaluation = exports.QuestAuditRuleResult = exports.QuestAuditStatus = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Quest_entity_1 = require("./Quest.entity");
const QuestAuditEvent_entity_1 = require("./QuestAuditEvent.entity");
const enums_1 = require("../enums");
var QuestAuditStatus;
(function (QuestAuditStatus) {
    QuestAuditStatus["PASSED"] = "PASSED";
    QuestAuditStatus["FAILED"] = "FAILED";
    QuestAuditStatus["INDETERMINATE"] = "INDETERMINATE";
    QuestAuditStatus["SKIPPED"] = "SKIPPED";
})(QuestAuditStatus || (exports.QuestAuditStatus = QuestAuditStatus = {}));
(0, graphql_1.registerEnumType)(QuestAuditStatus, { name: 'QuestAuditStatus' });
let QuestAuditRuleResult = class QuestAuditRuleResult {
};
exports.QuestAuditRuleResult = QuestAuditRuleResult;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestAuditRuleResult.prototype, "property", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_entity_1.QuestRuleOperator),
    __metadata("design:type", String)
], QuestAuditRuleResult.prototype, "operator", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestAuditRuleResult.prototype, "expected", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], QuestAuditRuleResult.prototype, "actual", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], QuestAuditRuleResult.prototype, "passed", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], QuestAuditRuleResult.prototype, "reason", void 0);
exports.QuestAuditRuleResult = QuestAuditRuleResult = __decorate([
    (0, graphql_1.ObjectType)()
], QuestAuditRuleResult);
let QuestAuditEvaluation = class QuestAuditEvaluation extends typeorm_1.BaseEntity {
};
exports.QuestAuditEvaluation = QuestAuditEvaluation;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint' }),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuestAuditEvent_entity_1.QuestAuditEvent, (e) => e.evaluations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'eventId', referencedColumnName: 'id' }),
    __metadata("design:type", QuestAuditEvent_entity_1.QuestAuditEvent)
], QuestAuditEvaluation.prototype, "event", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_entity_1.QuestTrigger),
    (0, typeorm_1.Column)('enum', { enum: Quest_entity_1.QuestTrigger, enumName: 'quest_trigger' }),
    (0, class_validator_1.IsEnum)(Quest_entity_1.QuestTrigger),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "trigger", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "questId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "questName", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.QuestType),
    (0, typeorm_1.Column)('enum', { enum: enums_1.QuestType, enumName: 'quest_type' }),
    (0, class_validator_1.IsEnum)(enums_1.QuestType),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "questType", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_entity_1.QuestPeriod),
    (0, typeorm_1.Column)('enum', { enum: Quest_entity_1.QuestPeriod, enumName: 'quest_period' }),
    (0, class_validator_1.IsEnum)(Quest_entity_1.QuestPeriod),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestAuditStatus),
    (0, typeorm_1.Column)('enum', { enum: QuestAuditStatus, enumName: 'quest_audit_status' }),
    (0, class_validator_1.IsEnum)(QuestAuditStatus),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], QuestAuditEvaluation.prototype, "awardedPoints", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 2, default: 1.0 }),
    __metadata("design:type", Number)
], QuestAuditEvaluation.prototype, "multiplier", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvaluation.prototype, "userQuestProgressNonce", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], QuestAuditEvaluation.prototype, "questRevision", void 0);
__decorate([
    (0, graphql_1.Field)(() => [QuestAuditRuleResult]),
    (0, typeorm_1.Column)('jsonb', { default: () => "'[]'::jsonb" }),
    (0, class_transformer_1.Type)(() => QuestAuditRuleResult),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], QuestAuditEvaluation.prototype, "ruleResults", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuestAuditEvaluation.prototype, "createdAt", void 0);
exports.QuestAuditEvaluation = QuestAuditEvaluation = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'quest_audit_evaluations' }),
    (0, typeorm_1.Index)(['eventId']),
    (0, typeorm_1.Index)(['userAddress', 'createdAt', 'id']),
    (0, typeorm_1.Index)(['questId', 'createdAt', 'id']),
    (0, typeorm_1.Index)(['status', 'createdAt', 'id'])
], QuestAuditEvaluation);
//# sourceMappingURL=QuestAuditEvaluations.entity.js.map