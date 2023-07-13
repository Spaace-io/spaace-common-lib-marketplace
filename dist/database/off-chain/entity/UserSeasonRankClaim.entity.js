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
exports.UserSeasonRankClaim = exports.LoyaltyRewardClaim = exports.CosmeticLoyaltyRewardClaim = exports.SpaaceTokensLoyaltyRewardClaim = exports.StakingBonusLoyaltyRewardClaim = exports.LoyaltyPointsLoyaltyRewardClaim = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const ethers_1 = require("ethers");
const class_transformer_1 = require("class-transformer");
let LoyaltyPointsLoyaltyRewardClaim = class LoyaltyPointsLoyaltyRewardClaim {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyPointsLoyaltyRewardClaim.prototype, "amount", void 0);
LoyaltyPointsLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)()
], LoyaltyPointsLoyaltyRewardClaim);
exports.LoyaltyPointsLoyaltyRewardClaim = LoyaltyPointsLoyaltyRewardClaim;
let StakingBonusLoyaltyRewardClaim = class StakingBonusLoyaltyRewardClaim {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StakingBonusLoyaltyRewardClaim.prototype, "amount", void 0);
StakingBonusLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)()
], StakingBonusLoyaltyRewardClaim);
exports.StakingBonusLoyaltyRewardClaim = StakingBonusLoyaltyRewardClaim;
let SpaaceTokensLoyaltyRewardClaim = class SpaaceTokensLoyaltyRewardClaim {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpaaceTokensLoyaltyRewardClaim.prototype, "amount", void 0);
SpaaceTokensLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)()
], SpaaceTokensLoyaltyRewardClaim);
exports.SpaaceTokensLoyaltyRewardClaim = SpaaceTokensLoyaltyRewardClaim;
let CosmeticLoyaltyRewardClaim = class CosmeticLoyaltyRewardClaim {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CosmeticLoyaltyRewardClaim.prototype, "id", void 0);
CosmeticLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)()
], CosmeticLoyaltyRewardClaim);
exports.CosmeticLoyaltyRewardClaim = CosmeticLoyaltyRewardClaim;
exports.LoyaltyRewardClaim = (0, graphql_1.createUnionType)({
    name: 'LoyaltyRewardClaim',
    types: () => [
        LoyaltyPointsLoyaltyRewardClaim,
        StakingBonusLoyaltyRewardClaim,
        SpaaceTokensLoyaltyRewardClaim,
        CosmeticLoyaltyRewardClaim,
    ],
});
let UserSeasonRankClaim = class UserSeasonRankClaim {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserSeasonRankClaim.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", Number)
], UserSeasonRankClaim.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.LoyaltyRank),
    (0, typeorm_1.PrimaryColumn)('enum', { enum: _1.LoyaltyRank, enumName: 'rank' }),
    (0, typeorm_1.ManyToOne)(() => _1.SeasonRank),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'rank', referencedColumnName: 'rank' },
    ]),
    __metadata("design:type", String)
], UserSeasonRankClaim.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exports.LoyaltyRewardClaim]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => Object, {
        discriminator: {
            property: '__typename',
            subTypes: [
                {
                    name: 'LoyaltyPointsLoyaltyRewardClaim',
                    value: LoyaltyPointsLoyaltyRewardClaim,
                },
                {
                    name: 'StakingBonusLoyaltyRewardClaim',
                    value: StakingBonusLoyaltyRewardClaim,
                },
                {
                    name: 'SpaaceTokensLoyaltyRewardClaim',
                    value: SpaaceTokensLoyaltyRewardClaim,
                },
                {
                    name: 'CosmeticLoyaltyRewardClaim',
                    value: CosmeticLoyaltyRewardClaim,
                },
            ],
        },
    }),
    __metadata("design:type", Array)
], UserSeasonRankClaim.prototype, "rewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserSeasonRankClaim.prototype, "timestamp", void 0);
UserSeasonRankClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], UserSeasonRankClaim);
exports.UserSeasonRankClaim = UserSeasonRankClaim;
//# sourceMappingURL=UserSeasonRankClaim.entity.js.map