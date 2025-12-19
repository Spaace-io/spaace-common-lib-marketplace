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
exports.UserDiscordRankSync = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const DiscordTierEnum_enum_1 = require("../enums/DiscordTierEnum.enum");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
let UserDiscordRankSync = class UserDiscordRankSync extends typeorm_1.BaseEntity {
};
exports.UserDiscordRankSync = UserDiscordRankSync;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserDiscordRankSync.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], UserDiscordRankSync.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserDiscordRankSync.prototype, "discordId", void 0);
__decorate([
    (0, graphql_1.Field)(() => DiscordTierEnum_enum_1.DiscordTierEnum, { nullable: true }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enumName: 'discord_tier',
        enum: DiscordTierEnum_enum_1.DiscordTierEnum,
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDiscordRankSync.prototype, "lastSyncedTier", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], UserDiscordRankSync.prototype, "lastSyncedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], UserDiscordRankSync.prototype, "updatedAt", void 0);
exports.UserDiscordRankSync = UserDiscordRankSync = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_discord_rank_sync' }),
    (0, typeorm_1.Index)(['discordId']),
    (0, typeorm_1.Index)(['seasonNumber', 'updatedAt'])
], UserDiscordRankSync);
//# sourceMappingURL=UserDiscordRankSync.entity.js.map