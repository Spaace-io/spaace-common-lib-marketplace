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
exports.NansenMysteryChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const NansenAirdropParticipant_entity_1 = require("./NansenAirdropParticipant.entity");
const NansenAirdrop_enum_1 = require("../enums/NansenAirdrop.enum");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
let NansenMysteryChest = class NansenMysteryChest extends typeorm_1.BaseEntity {
};
exports.NansenMysteryChest = NansenMysteryChest;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NansenMysteryChest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => NansenAirdropParticipant_entity_1.NansenAirdropParticipant, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'participantId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], NansenMysteryChest.prototype, "participantId", void 0);
__decorate([
    (0, graphql_1.Field)(() => NansenAirdrop_enum_1.NansenChestType),
    (0, typeorm_1.Column)('enum', { enum: NansenAirdrop_enum_1.NansenChestType, enumName: 'nansen_chest_type' }),
    __metadata("design:type", String)
], NansenMysteryChest.prototype, "chestType", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank, { nullable: true }),
    (0, typeorm_1.Column)('enum', {
        enum: SeasonRank_entity_1.LoyaltyRank,
        enumName: 'rank',
        nullable: true,
    }),
    __metadata("design:type", Object)
], NansenMysteryChest.prototype, "unlockRequirement", void 0);
__decorate([
    (0, graphql_1.Field)(() => NansenAirdrop_enum_1.NansenChestStatus),
    (0, typeorm_1.Column)('enum', {
        enum: NansenAirdrop_enum_1.NansenChestStatus,
        enumName: 'nansen_chest_status',
        default: NansenAirdrop_enum_1.NansenChestStatus.LOCKED,
    }),
    __metadata("design:type", String)
], NansenMysteryChest.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], NansenMysteryChest.prototype, "unlockedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], NansenMysteryChest.prototype, "claimedAt", void 0);
exports.NansenMysteryChest = NansenMysteryChest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'nansen_mystery_chests' }),
    (0, typeorm_1.Index)('IDX_nansen_chests_participant', ['participantId']),
    (0, typeorm_1.Index)('IDX_nansen_chests_status', ['status']),
    (0, typeorm_1.Index)('IDX_nansen_chests_type', ['chestType'])
], NansenMysteryChest);
//# sourceMappingURL=NansenMysteryChest.entity.js.map