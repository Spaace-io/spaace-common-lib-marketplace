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
exports.AmbassadorEpoch = exports.AmbassadorEpochStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var AmbassadorEpochStatus;
(function (AmbassadorEpochStatus) {
    AmbassadorEpochStatus["DRAFT"] = "DRAFT";
    AmbassadorEpochStatus["SCHEDULED"] = "SCHEDULED";
    AmbassadorEpochStatus["LIVE"] = "LIVE";
    AmbassadorEpochStatus["ENDED"] = "ENDED";
})(AmbassadorEpochStatus || (exports.AmbassadorEpochStatus = AmbassadorEpochStatus = {}));
(0, graphql_1.registerEnumType)(AmbassadorEpochStatus, { name: 'AmbassadorEpochStatus' });
let AmbassadorEpoch = class AmbassadorEpoch extends typeorm_1.BaseEntity {
};
exports.AmbassadorEpoch = AmbassadorEpoch;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AmbassadorEpoch.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AmbassadorEpoch.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], AmbassadorEpoch.prototype, "startAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], AmbassadorEpoch.prototype, "endAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 18, scale: 2 }),
    __metadata("design:type", String)
], AmbassadorEpoch.prototype, "rewardPoolUsd", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], AmbassadorEpoch.prototype, "winnersCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => AmbassadorEpochStatus),
    (0, typeorm_1.Column)('enum', {
        enum: AmbassadorEpochStatus,
        enumName: 'ambassador_epoch_status',
        default: AmbassadorEpochStatus.DRAFT,
    }),
    __metadata("design:type", String)
], AmbassadorEpoch.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: true }),
    __metadata("design:type", Object)
], AmbassadorEpoch.prototype, "lastLeaderboardComputedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: true }),
    __metadata("design:type", Object)
], AmbassadorEpoch.prototype, "finalizedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], AmbassadorEpoch.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], AmbassadorEpoch.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 7 }),
    __metadata("design:type", Number)
], AmbassadorEpoch.prototype, "newUsersLookbackDays", void 0);
exports.AmbassadorEpoch = AmbassadorEpoch = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'ambassador_epochs' }),
    (0, typeorm_1.Index)(['status', 'startAt']),
    (0, typeorm_1.Index)(['status', 'endAt'])
], AmbassadorEpoch);
//# sourceMappingURL=AmbassadorEpoch.entity.js.map