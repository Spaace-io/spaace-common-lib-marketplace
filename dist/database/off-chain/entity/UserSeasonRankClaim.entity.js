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
const class_validator_1 = require("class-validator");
let LoyaltyPointsLoyaltyRewardClaim = class LoyaltyPointsLoyaltyRewardClaim {
    constructor(amount) {
        this.type = _1.LoyaltyRewardType.LOYALTY_POINTS;
        this.amount = amount;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyPointsLoyaltyRewardClaim.prototype, "amount", void 0);
LoyaltyPointsLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], LoyaltyPointsLoyaltyRewardClaim);
exports.LoyaltyPointsLoyaltyRewardClaim = LoyaltyPointsLoyaltyRewardClaim;
let StakingBonusLoyaltyRewardClaim = class StakingBonusLoyaltyRewardClaim {
    constructor(amount) {
        this.type = _1.LoyaltyRewardType.STAKING_BONUS;
        this.amount = amount;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StakingBonusLoyaltyRewardClaim.prototype, "amount", void 0);
StakingBonusLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], StakingBonusLoyaltyRewardClaim);
exports.StakingBonusLoyaltyRewardClaim = StakingBonusLoyaltyRewardClaim;
let SpaaceTokensLoyaltyRewardClaim = class SpaaceTokensLoyaltyRewardClaim {
    constructor(amount) {
        this.type = _1.LoyaltyRewardType.SPAACE_TOKENS;
        this.amount = amount;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpaaceTokensLoyaltyRewardClaim.prototype, "amount", void 0);
SpaaceTokensLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], SpaaceTokensLoyaltyRewardClaim);
exports.SpaaceTokensLoyaltyRewardClaim = SpaaceTokensLoyaltyRewardClaim;
let CosmeticLoyaltyRewardClaim = class CosmeticLoyaltyRewardClaim {
    constructor(id) {
        this.type = _1.LoyaltyRewardType.COSMETIC;
        this.id = id;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CosmeticLoyaltyRewardClaim.prototype, "id", void 0);
CosmeticLoyaltyRewardClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
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
let UserSeasonRankClaim = class UserSeasonRankClaim extends typeorm_1.BaseEntity {
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
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], UserSeasonRankClaim.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.LoyaltyRank),
    (0, typeorm_1.PrimaryColumn)('enum', { enum: _1.LoyaltyRank, enumName: 'rank' }),
    (0, typeorm_1.ManyToOne)(() => _1.SeasonRank),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'rank', referencedColumnName: 'rank' },
    ]),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", String)
], UserSeasonRankClaim.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exports.LoyaltyRewardClaim]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => Object, {
        discriminator: {
            property: 'type',
            subTypes: [
                {
                    name: _1.LoyaltyRewardType.LOYALTY_POINTS,
                    value: LoyaltyPointsLoyaltyRewardClaim,
                },
                {
                    name: _1.LoyaltyRewardType.STAKING_BONUS,
                    value: StakingBonusLoyaltyRewardClaim,
                },
                {
                    name: _1.LoyaltyRewardType.SPAACE_TOKENS,
                    value: SpaaceTokensLoyaltyRewardClaim,
                },
                {
                    name: _1.LoyaltyRewardType.COSMETIC,
                    value: CosmeticLoyaltyRewardClaim,
                },
            ],
        },
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], UserSeasonRankClaim.prototype, "rewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserSeasonRankClaim.prototype, "timestamp", void 0);
UserSeasonRankClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_season_rank_claims' })
], UserSeasonRankClaim);
exports.UserSeasonRankClaim = UserSeasonRankClaim;
//# sourceMappingURL=UserSeasonRankClaim.entity.js.map