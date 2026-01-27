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
exports.UserSeasonChapterData = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const User_entity_1 = require("./User.entity");
const Season_entity_1 = require("./Season.entity");
const SeasonChapter_entity_1 = require("./SeasonChapter.entity");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
const DiscordTierEnum_enum_1 = require("../enums/DiscordTierEnum.enum");
let UserSeasonChapterData = class UserSeasonChapterData extends typeorm_1.BaseEntity {
};
exports.UserSeasonChapterData = UserSeasonChapterData;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserSeasonChapterData.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => Season_entity_1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], UserSeasonChapterData.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryColumn)('integer'),
    (0, typeorm_1.ManyToOne)(() => SeasonChapter_entity_1.SeasonChapter),
    (0, typeorm_1.JoinColumn)({ name: 'chapterId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], UserSeasonChapterData.prototype, "chapterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserSeasonChapterData.prototype, "snapshotAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], UserSeasonChapterData.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', { enum: SeasonRank_entity_1.LoyaltyRank, enumName: 'rank' }),
    __metadata("design:type", String)
], UserSeasonChapterData.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', { default: '0' }),
    __metadata("design:type", String)
], UserSeasonChapterData.prototype, "questCompleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => DiscordTierEnum_enum_1.DiscordTierEnum, { nullable: true }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DiscordTierEnum_enum_1.DiscordTierEnum,
        enumName: 'discord_tier',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Object)
], UserSeasonChapterData.prototype, "discordTierFloor", void 0);
exports.UserSeasonChapterData = UserSeasonChapterData = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_season_chapters_data' }),
    (0, typeorm_1.Index)(['seasonNumber', 'chapterId']),
    (0, typeorm_1.Index)(['seasonNumber', 'points'])
], UserSeasonChapterData);
//# sourceMappingURL=UserSeasonChapterData.entity.js.map