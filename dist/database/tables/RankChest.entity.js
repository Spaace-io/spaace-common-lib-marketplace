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
exports.RankChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Season_entity_1 = require("./Season.entity");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
const User_entity_1 = require("./User.entity");
const RankChestState_enum_1 = require("../enums/RankChestState.enum");
const RankChestReward_entity_1 = require("./RankChestReward.entity");
let RankChest = class RankChest extends typeorm_1.BaseEntity {
};
exports.RankChest = RankChest;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RankChest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], RankChest.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], RankChest.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], RankChest.prototype, "seasonNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Season_entity_1.Season, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", Season_entity_1.Season)
], RankChest.prototype, "season", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', { enum: SeasonRank_entity_1.LoyaltyRank, enumName: 'rank' }),
    __metadata("design:type", String)
], RankChest.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => RankChestState_enum_1.RankChestState),
    (0, typeorm_1.Column)('enum', {
        enum: RankChestState_enum_1.RankChestState,
        enumName: 'rank_chest_state_enum',
        default: RankChestState_enum_1.RankChestState.CLAIMABLE,
    }),
    __metadata("design:type", String)
], RankChest.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], RankChest.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true, default: null }),
    __metadata("design:type", Object)
], RankChest.prototype, "claimedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], RankChest.prototype, "createdFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => RankChestReward_entity_1.RankChestReward, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => RankChestReward_entity_1.RankChestReward, (r) => r.chest, { nullable: true }),
    __metadata("design:type", Object)
], RankChest.prototype, "reward", void 0);
exports.RankChest = RankChest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'rank_chests' }),
    (0, typeorm_1.Index)(['userAddress', 'seasonNumber', 'state', 'createdAt']),
    (0, typeorm_1.Index)(['userAddress', 'seasonNumber', 'rank'], { unique: true })
], RankChest);
//# sourceMappingURL=RankChest.entity.js.map