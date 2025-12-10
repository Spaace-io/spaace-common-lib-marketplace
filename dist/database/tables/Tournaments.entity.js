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
exports.TournamentParticipant = exports.TournamentResult = exports.TournamentRewardBracket = exports.TournamentsEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const TournamentStatus_enum_1 = require("../enums/TournamentStatus.enum");
let TournamentsEntity = class TournamentsEntity extends typeorm_1.BaseEntity {
};
exports.TournamentsEntity = TournamentsEntity;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
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
        default: TournamentStatus_enum_1.TournamentStatus.DRAFT,
        name: 'status',
    }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'start_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "startAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { name: 'end_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "endAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', {
        name: 'total_prize_xp',
        comment: 'Total prize XP (stored as string)',
        default: '0',
    }),
    __metadata("design:type", String)
], TournamentsEntity.prototype, "totalPrizeXp", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone', name: 'updated_at' }),
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
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', { name: 'reward_xp' }),
    __metadata("design:type", String)
], TournamentRewardBracket.prototype, "rewardXp", void 0);
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
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentRewardBracket.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentRewardBracket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TournamentsEntity),
    (0, typeorm_1.JoinColumn)({ name: 'tournament_id', referencedColumnName: 'id' }),
    __metadata("design:type", TournamentsEntity)
], TournamentRewardBracket.prototype, "tournament", void 0);
exports.TournamentRewardBracket = TournamentRewardBracket = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_reward_brackets' })
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
    (0, typeorm_1.Column)('char'),
    __metadata("design:type", String)
], TournamentResult.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { name: 'final_place' }),
    __metadata("design:type", Number)
], TournamentResult.prototype, "finalPlace", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', {
        name: 'reward_xp',
        comment: 'XP reward received (stored as string)',
    }),
    __metadata("design:type", String)
], TournamentResult.prototype, "rewardXp", void 0);
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
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentResult.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentResult.prototype, "updatedAt", void 0);
exports.TournamentResult = TournamentResult = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_results' })
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
    (0, typeorm_1.Column)('char'),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', {
        name: 'score',
        comment: 'Current player progress (e.g., trading volume in Wei) (stored as string)',
        default: '0',
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        // Конвертируем wei в ETH при чтении из БД
        return ethers_1.ethers.utils.formatEther(value || '0');
    }, { toPlainOnly: true }),
    __metadata("design:type", String)
], TournamentParticipant.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', {
        name: 'place',
        comment: 'Computed field, updated periodically or on request',
        nullable: true,
    }),
    __metadata("design:type", Object)
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
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone', name: 'created_at' }),
    __metadata("design:type", Date)
], TournamentParticipant.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone', name: 'updated_at' }),
    __metadata("design:type", Date)
], TournamentParticipant.prototype, "updatedAt", void 0);
exports.TournamentParticipant = TournamentParticipant = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'tournament_participants' })
], TournamentParticipant);
//# sourceMappingURL=Tournaments.entity.js.map