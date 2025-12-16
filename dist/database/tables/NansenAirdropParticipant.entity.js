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
exports.NansenAirdropParticipant = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const NansenAirdrop_enum_1 = require("../enums/NansenAirdrop.enum");
let NansenAirdropParticipant = class NansenAirdropParticipant extends typeorm_1.BaseEntity {
};
exports.NansenAirdropParticipant = NansenAirdropParticipant;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NansenAirdropParticipant.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar', { length: 42, unique: true }),
    __metadata("design:type", String)
], NansenAirdropParticipant.prototype, "walletAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => NansenAirdrop_enum_1.NansenTier),
    (0, typeorm_1.Column)('enum', { enum: NansenAirdrop_enum_1.NansenTier, enumName: 'nansen_tier' }),
    __metadata("design:type", String)
], NansenAirdropParticipant.prototype, "nansenTier", void 0);
__decorate([
    (0, graphql_1.Field)(() => NansenAirdrop_enum_1.NansenRewardType),
    (0, typeorm_1.Column)('enum', { enum: NansenAirdrop_enum_1.NansenRewardType, enumName: 'nansen_reward_type' }),
    __metadata("design:type", String)
], NansenAirdropParticipant.prototype, "rewardType", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 4, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "multiplierValue", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "multiplierActivatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "multiplierExpiresAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], NansenAirdropParticipant.prototype, "requiresTweet", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "tweetUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "tweetVerifiedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NansenAirdropParticipant.prototype, "eligibilityCheckedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], NansenAirdropParticipant.prototype, "nansenApiResponse", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NansenAirdropParticipant.prototype, "createdAt", void 0);
exports.NansenAirdropParticipant = NansenAirdropParticipant = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'nansen_airdrop_participants' }),
    (0, typeorm_1.Index)('IDX_nansen_participants_wallet', ['walletAddress']),
    (0, typeorm_1.Index)('IDX_nansen_participants_tier', ['nansenTier']),
    (0, typeorm_1.Index)('IDX_nansen_participants_reward_type', ['rewardType'])
], NansenAirdropParticipant);
//# sourceMappingURL=NansenAirdropParticipant.entity.js.map