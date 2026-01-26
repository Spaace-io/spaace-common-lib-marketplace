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
exports.AmbassadorEpochLeaderboard = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let AmbassadorEpochLeaderboard = class AmbassadorEpochLeaderboard extends typeorm_1.BaseEntity {
};
exports.AmbassadorEpochLeaderboard = AmbassadorEpochLeaderboard;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], AmbassadorEpochLeaderboard.prototype, "epochId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], AmbassadorEpochLeaderboard.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], AmbassadorEpochLeaderboard.prototype, "scoreBp", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], AmbassadorEpochLeaderboard.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], AmbassadorEpochLeaderboard.prototype, "computedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], AmbassadorEpochLeaderboard.prototype, "referralsCount", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], AmbassadorEpochLeaderboard.prototype, "tradingVolume", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], AmbassadorEpochLeaderboard.prototype, "referralTradingVolume", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, default: '0' }),
    __metadata("design:type", String)
], AmbassadorEpochLeaderboard.prototype, "xpSum", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Object)
], AmbassadorEpochLeaderboard.prototype, "socialScore", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], AmbassadorEpochLeaderboard.prototype, "newActiveReferralsCount", void 0);
exports.AmbassadorEpochLeaderboard = AmbassadorEpochLeaderboard = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'ambassador_epoch_leaderboard' }),
    (0, typeorm_1.Index)(['epochId', 'rank'])
], AmbassadorEpochLeaderboard);
//# sourceMappingURL=AmbassadorEpochLeaderboard.entity.js.map