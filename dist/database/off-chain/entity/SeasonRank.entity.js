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
var SeasonRank_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonRank = exports.LoyaltyReward = exports.CosmeticLoyaltyReward = exports.SpaaceTokensLoyaltyReward = exports.StakingBonusLoyaltyReward = exports.LoyaltyPointsLoyaltyReward = exports.LoyaltyRank = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const class_transformer_1 = require("class-transformer");
var LoyaltyRank;
(function (LoyaltyRank) {
    LoyaltyRank["BRONZE_5"] = "B5";
    LoyaltyRank["BRONZE_4"] = "B4";
    LoyaltyRank["BRONZE_3"] = "B3";
    LoyaltyRank["BRONZE_2"] = "B2";
    LoyaltyRank["BRONZE_1"] = "B1";
    LoyaltyRank["SILVER_5"] = "S5";
    LoyaltyRank["SILVER_4"] = "S4";
    LoyaltyRank["SILVER_3"] = "S3";
    LoyaltyRank["SILVER_2"] = "S2";
    LoyaltyRank["SILVER_1"] = "S1";
    LoyaltyRank["GOLD_5"] = "G5";
    LoyaltyRank["GOLD_4"] = "G4";
    LoyaltyRank["GOLD_3"] = "G3";
    LoyaltyRank["GOLD_2"] = "G2";
    LoyaltyRank["GOLD_1"] = "G1";
    LoyaltyRank["PLATINUM_5"] = "P5";
    LoyaltyRank["PLATINUM_4"] = "P4";
    LoyaltyRank["PLATINUM_3"] = "P3";
    LoyaltyRank["PLATINUM_2"] = "P2";
    LoyaltyRank["PLATINUM_1"] = "P1";
    LoyaltyRank["DIAMOND_5"] = "D5";
    LoyaltyRank["DIAMOND_4"] = "D4";
    LoyaltyRank["DIAMOND_3"] = "D3";
    LoyaltyRank["DIAMOND_2"] = "D2";
    LoyaltyRank["DIAMOND_1"] = "D1";
})(LoyaltyRank = exports.LoyaltyRank || (exports.LoyaltyRank = {}));
(0, graphql_1.registerEnumType)(LoyaltyRank, {
    name: 'LoyaltyRank',
});
let LoyaltyPointsLoyaltyReward = class LoyaltyPointsLoyaltyReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyPointsLoyaltyReward.prototype, "min", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyPointsLoyaltyReward.prototype, "max", void 0);
LoyaltyPointsLoyaltyReward = __decorate([
    (0, graphql_1.ObjectType)()
], LoyaltyPointsLoyaltyReward);
exports.LoyaltyPointsLoyaltyReward = LoyaltyPointsLoyaltyReward;
let StakingBonusLoyaltyReward = class StakingBonusLoyaltyReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StakingBonusLoyaltyReward.prototype, "min", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StakingBonusLoyaltyReward.prototype, "max", void 0);
StakingBonusLoyaltyReward = __decorate([
    (0, graphql_1.ObjectType)()
], StakingBonusLoyaltyReward);
exports.StakingBonusLoyaltyReward = StakingBonusLoyaltyReward;
let SpaaceTokensLoyaltyReward = class SpaaceTokensLoyaltyReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpaaceTokensLoyaltyReward.prototype, "min", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpaaceTokensLoyaltyReward.prototype, "max", void 0);
SpaaceTokensLoyaltyReward = __decorate([
    (0, graphql_1.ObjectType)()
], SpaaceTokensLoyaltyReward);
exports.SpaaceTokensLoyaltyReward = SpaaceTokensLoyaltyReward;
let CosmeticLoyaltyReward = class CosmeticLoyaltyReward {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CosmeticLoyaltyReward.prototype, "ids", void 0);
CosmeticLoyaltyReward = __decorate([
    (0, graphql_1.ObjectType)()
], CosmeticLoyaltyReward);
exports.CosmeticLoyaltyReward = CosmeticLoyaltyReward;
exports.LoyaltyReward = (0, graphql_1.createUnionType)({
    name: 'LoyaltyReward',
    types: () => [
        LoyaltyPointsLoyaltyReward,
        StakingBonusLoyaltyReward,
        SpaaceTokensLoyaltyReward,
        CosmeticLoyaltyReward,
    ],
});
let SeasonRank = SeasonRank_1 = class SeasonRank extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", Number)
], SeasonRank.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => LoyaltyRank),
    (0, typeorm_1.PrimaryColumn)('enum', { enum: LoyaltyRank, enumName: 'rank' }),
    __metadata("design:type", String)
], SeasonRank.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SeasonRank.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exports.LoyaltyReward]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => Object, {
        discriminator: {
            property: '__typename',
            subTypes: [
                {
                    name: 'LoyaltyPointsLoyaltyReward',
                    value: LoyaltyPointsLoyaltyReward,
                },
                {
                    name: 'StakingBonusLoyaltyReward',
                    value: StakingBonusLoyaltyReward,
                },
                {
                    name: 'SpaaceTokensLoyaltyReward',
                    value: SpaaceTokensLoyaltyReward,
                },
                {
                    name: 'CosmeticLoyaltyReward',
                    value: CosmeticLoyaltyReward,
                },
            ],
        },
    }),
    __metadata("design:type", Array)
], SeasonRank.prototype, "rewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_1, { nullable: true }),
    (0, class_transformer_1.Type)(() => SeasonRank_1),
    __metadata("design:type", Object)
], SeasonRank.prototype, "previousRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_1, { nullable: true }),
    (0, class_transformer_1.Type)(() => SeasonRank_1),
    __metadata("design:type", Object)
], SeasonRank.prototype, "nextRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.UserSeasonRankClaim, { nullable: true }),
    (0, class_transformer_1.Type)(() => _1.UserSeasonRankClaim),
    __metadata("design:type", Object)
], SeasonRank.prototype, "claim", void 0);
SeasonRank = SeasonRank_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'season_ranks' })
], SeasonRank);
exports.SeasonRank = SeasonRank;
//# sourceMappingURL=SeasonRank.entity.js.map