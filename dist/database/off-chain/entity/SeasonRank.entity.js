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
exports.SeasonRank = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const class_transformer_1 = require("class-transformer");
var Rank;
(function (Rank) {
    Rank["BRONZE_5"] = "bronze5";
    Rank["BRONZE_4"] = "bronze4";
    Rank["BRONZE_3"] = "bronze3";
    Rank["BRONZE_2"] = "bronze2";
    Rank["BRONZE_1"] = "bronze1";
    Rank["SILVER_5"] = "silver5";
    Rank["SILVER_4"] = "silver4";
    Rank["SILVER_3"] = "silver3";
    Rank["SILVER_2"] = "silver2";
    Rank["SILVER_1"] = "silver1";
    Rank["GOLD_5"] = "gold5";
    Rank["GOLD_4"] = "gold4";
    Rank["GOLD_3"] = "gold3";
    Rank["GOLD_2"] = "gold2";
    Rank["GOLD_1"] = "gold1";
    Rank["PLATINUM_5"] = "platinum5";
    Rank["PLATINUM_4"] = "platinum4";
    Rank["PLATINUM_3"] = "platinum3";
    Rank["PLATINUM_2"] = "platinum2";
    Rank["PLATINUM_1"] = "platinum1";
    Rank["DIAMOND_5"] = "diamond5";
    Rank["DIAMOND_4"] = "diamond4";
    Rank["DIAMOND_3"] = "diamond3";
    Rank["DIAMOND_2"] = "diamond2";
    Rank["DIAMOND_1"] = "diamond1";
})(Rank || (Rank = {}));
(0, graphql_1.registerEnumType)(Rank, {
    name: 'Rank',
});
let SeasonRank = class SeasonRank {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    __metadata("design:type", Number)
], SeasonRank.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Rank),
    (0, typeorm_1.PrimaryColumn)('enum', { enum: Rank, enumName: 'rank' }),
    __metadata("design:type", String)
], SeasonRank.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SeasonRank.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => [_1.QuestReward]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => Object, {
        discriminator: {
            property: '__typename',
            subTypes: [
                {
                    name: 'LoyaltyPointsQuestReward',
                    value: _1.LoyaltyPointsQuestReward,
                },
                {
                    name: 'StakingBonusQuestReward',
                    value: _1.StakingBonusQuestReward,
                },
                {
                    name: 'SpaaceTokensQuestReward',
                    value: _1.SpaaceTokensQuestReward,
                },
                {
                    name: 'CosmeticQuestReward',
                    value: _1.CosmeticQuestReward,
                },
            ],
        },
    }),
    __metadata("design:type", Array)
], SeasonRank.prototype, "rewards", void 0);
SeasonRank = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], SeasonRank);
exports.SeasonRank = SeasonRank;
//# sourceMappingURL=SeasonRank.entity.js.map