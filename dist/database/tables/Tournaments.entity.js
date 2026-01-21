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
exports.TournamentParticipant = exports.TournamentResult = exports.TournamentRewardBracket = exports.TournamentsEntity = exports.BonusTierType = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const TournamentStatus_enum_1 = require("../enums/TournamentStatus.enum");
const TournamentRewardType_enum_1 = require("../enums/TournamentRewardType.enum");
const UserXpLog_entity_1 = require("./UserXpLog.entity");
const User_entity_1 = require("./User.entity");
let BonusTierType = class BonusTierType {
};
exports.BonusTierType = BonusTierType;
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Threshold in ETH to unlock this bonus tier',
    }),
    __metadata("design:type", Number)
], BonusTierType.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Bonus multiplier for this tier (e.g., 1.2 = +20%)',
    }),
    __metadata("design:type", Number)
], BonusTierType.prototype, "multiplier", void 0);
exports.BonusTierType = BonusTierType = __decorate([
    (0, graphql_1.ObjectType)()
], BonusTierType);
let TournamentsEntity = class TournamentsEntity extends typeorm_1.BaseEntity {
};
exports.TournamentsEntity = TournamentsEntity;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Tournament name, unique' }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)('text', { comment: 'Unique tournament name' }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => TournamentStatus_enum_1.TournamentStatus),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TournamentStatus_enum_1.TournamentStatus,
        default: TournamentStatus_enum_1.TournamentStatus.SCHEDULED,
        name: 'status',
    }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'start_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "startAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'end_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "endAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', {
        name: 'total_prize_amount',
        comment: 'Total prize amount (XP or USD depending on reward_type)',
        default: '0',
    }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "totalPrizeAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => TournamentRewardType_enum_1.TournamentRewardType),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        name: 'reward_type',
        default: TournamentRewardType_enum_1.TournamentRewardType.XP,
        comment: 'Reward type: XP or USD (Spaace tokens)',
    }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "rewardType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', {
        precision: 78,
        name: 'rewarded_participants_volume_wei',
        nullable: true,
        comment: 'Cumulative trading volume in Wei of all rewarded participants (used for community bonus calculation)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value ? ethers_1.ethers.utils.formatEther(value) : null;
    }, { toPlainOnly: true }),
    __metadata("design:type", Object)
], TournamentsEntity.prototype, "rewardedParticipantsVolumeWei", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BonusTierType], {
        description: 'Community bonus tiers configuration: volume thresholds and multipliers',
        nullable: true,
    }),
    (0, typeorm_1.Column)('jsonb', {
        name: 'bonus_tiers',
        default: () => "'[]'::jsonb",
        nullable: false,
        comment: 'Community bonus tiers config: [{ thresholdUsd: 1000000, multiplier: 1.2 }, { thresholdUsd: 2000000, multiplier: 1.5 }]',
    }),
    __metadata("design:type", Array)
], TournamentsEntity.prototype, "bonusTiers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TournamentRewardBracket, (tournamentRewardBracket) => tournamentRewardBracket.tournament),
    __metadata("design:type", Array)
], TournamentsEntity.prototype, "rewardBrackets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TournamentResult, (tournamentResult) => tournamentResult.tournament),
    __metadata("design:type", Array)
], TournamentsEntity.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TournamentParticipant, (tournamentParticipant) => tournamentParticipant.tournament),
    __metadata("design:type", Array)
], TournamentsEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserXpLog_entity_1.UserXpLog, (userXpLog) => userXpLog.tournamentId, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], TournamentsEntity.prototype, "userXpLogs", void 0);
exports.TournamentsEntity = TournamentsEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournaments' })
], TournamentsEntity);
let TournamentRewardBracket = class TournamentRewardBracket extends typeorm_1.BaseEntity {
};
exports.TournamentRewardBracket = TournamentRewardBracket;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TournamentRewardBracket.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid', { name: 'tournament_id' }),
    __metadata("design:type", String)
], TournamentRewardBracket.prototype, "tournamentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { name: 'place_from' }),
    __metadata("design:type", Number)
], TournamentRewardBracket.prototype, "placeFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { name: 'place_to' }),
    __metadata("design:type", Number)
], TournamentRewardBracket.prototype, "placeTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('bigint', {
        name: 'reward_amount',
        nullable: true,
        comment: 'Reward amount (XP or USD depending on tournament reward_type). Can be null for USD tournaments with dynamic distribution',
    }),
    __metadata("design:type", Object)
], TournamentRewardBracket.prototype, "rewardAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', {
        precision: 78,
        name: 'score',
        comment: 'Final score/metric (e.g., volume) (stored as string)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return ethers_1.ethers.utils.formatEther(value || '0');
    }, { toPlainOnly: true }),
    __metadata("design:type", String)
], TournamentRewardBracket.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentRewardBracket.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentRewardBracket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TournamentsEntity),
    (0, typeorm_1.JoinColumn)({ name: 'tournament_id', referencedColumnName: 'id' }),
    __metadata("design:type", TournamentsEntity)
], TournamentRewardBracket.prototype, "tournament", void 0);
exports.TournamentRewardBracket = TournamentRewardBracket = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_reward_brackets' }),
    (0, typeorm_1.Index)(['tournamentId', 'placeFrom']),
    (0, typeorm_1.Index)(['tournamentId', 'placeTo'])
], TournamentRewardBracket);
let TournamentResult = class TournamentResult extends typeorm_1.BaseEntity {
};
exports.TournamentResult = TournamentResult;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TournamentResult.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid', { name: 'tournament_id' }),
    __metadata("design:type", String)
], TournamentResult.prototype, "tournamentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TournamentsEntity),
    (0, typeorm_1.JoinColumn)({ name: 'tournament_id', referencedColumnName: 'id' }),
    __metadata("design:type", TournamentsEntity)
], TournamentResult.prototype, "tournament", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], TournamentResult.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], TournamentResult.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { name: 'final_place' }),
    __metadata("design:type", Number)
], TournamentResult.prototype, "finalPlace", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', {
        name: 'reward_amount',
        comment: 'Final reward amount after bonus (XP or USD)',
    }),
    __metadata("design:type", String)
], TournamentResult.prototype, "rewardAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', {
        name: 'base_reward_amount',
        nullable: true,
        comment: 'Base reward amount before bonus multiplier',
    }),
    __metadata("design:type", Object)
], TournamentResult.prototype, "baseRewardAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', {
        precision: 78,
        name: 'score',
        comment: 'Final score/metric (e.g., volume) (stored as string)',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return ethers_1.ethers.utils.formatEther(value || '0');
    }, { toPlainOnly: true }),
    __metadata("design:type", String)
], TournamentResult.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { name: 'count_purchases' }),
    __metadata("design:type", Number)
], TournamentResult.prototype, "countPurchases", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentResult.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentResult.prototype, "updatedAt", void 0);
exports.TournamentResult = TournamentResult = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_results' }),
    (0, typeorm_1.Index)(['tournamentId', 'address']),
    (0, typeorm_1.Index)(['tournamentId', 'finalPlace'])
], TournamentResult);
let TournamentParticipant = class TournamentParticipant extends typeorm_1.BaseEntity {
};
exports.TournamentParticipant = TournamentParticipant;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid', { name: 'tournament_id' }),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "tournamentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TournamentsEntity),
    (0, typeorm_1.JoinColumn)({ name: 'tournament_id', referencedColumnName: 'id' }),
    __metadata("design:type", TournamentsEntity)
], TournamentParticipant.prototype, "tournament", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], TournamentParticipant.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', {
        precision: 78,
        name: 'score',
        comment: 'Current player progress (e.g., trading volume in Wei) (stored as string)',
        default: '0',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        return ethers_1.ethers.utils.formatEther(value || '0');
    }, { toPlainOnly: true }),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', {
        name: 'place',
        comment: 'Computed field, updated periodically or on request',
    }),
    __metadata("design:type", Number)
], TournamentParticipant.prototype, "place", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', {
        name: 'count_purchases',
        comment: 'Count of purchases',
    }),
    __metadata("design:type", Number)
], TournamentParticipant.prototype, "countPurchases", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentParticipant.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentParticipant.prototype, "updatedAt", void 0);
exports.TournamentParticipant = TournamentParticipant = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_participants' }),
    (0, typeorm_1.Index)(['tournamentId', 'address']),
    (0, typeorm_1.Index)(['tournamentId', 'place'])
], TournamentParticipant);
//# sourceMappingURL=Tournaments.entity.js.map