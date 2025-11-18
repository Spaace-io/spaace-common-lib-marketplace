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
exports.UserAirdropChestLoyaltyOpenseaChapter1 = exports.ChestsByRankOpenseaChapter1 = exports.AirdropChestByRankOpenseaChapter1 = exports.ChestRankOpenseaChapter1 = exports.UserAirdropChestOpenseaChapter1View = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const tables_1 = require("../tables");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let UserAirdropChestOpenseaChapter1View = class UserAirdropChestOpenseaChapter1View extends typeorm_1.BaseEntity {
};
exports.UserAirdropChestOpenseaChapter1View = UserAirdropChestOpenseaChapter1View;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserAirdropChestOpenseaChapter1View.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.AirdropTierOpenseaChapter1),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", tables_1.AirdropTierOpenseaChapter1)
], UserAirdropChestOpenseaChapter1View.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tables_1.AirdropChestOpenseaChapter1]),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], UserAirdropChestOpenseaChapter1View.prototype, "chests", void 0);
exports.UserAirdropChestOpenseaChapter1View = UserAirdropChestOpenseaChapter1View = __decorate([
    (0, graphql_1.ObjectType)('UserAirdropChestOpenseaChapter1View'),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .select('user.address', 'address')
                .addSelect('tier.id', 'tierId')
                .addSelect('tier.name', 'tierName')
                .addSelect('tier.totalXp', 'tierTotalXp')
                .addSelect('tier.totalChestsCount', 'tierTotalChestsCount')
                .addSelect((qb) => qb
                .select(`jsonb_agg(
              jsonb_build_object(
                'id', chest.id,
                'type', chest.type,
                'valueXp', chest.valueXp,
                'status', user_chest.status,
                'quantity', user_chest.quantity,
                'tier', jsonb_build_object(
                  'id', tier.id,
                  'name', tier.name,
                  'totalXp', tier.totalXp,
                  'totalChestsCount', tier.totalChestsCount
                )
              )
            )`, 'chests')
                .from('airdrop_users_chests_opensea_chapter1', 'user_chest')
                .innerJoin('airdrop_chests_opensea_chapter1', 'chest', 'chest.id = user_chest.chestId')
                .where('user_chest.address = user.address'), 'chests')
                .from('airdrop_users_opensea_chapter1', 'user')
                .innerJoin('airdrop_tiers_opensea_chapter1', 'tier', 'tier.id = user.tierId');
        },
        name: 'user_airdrop_chest_view_opensea_chapter1',
    })
], UserAirdropChestOpenseaChapter1View);
let LoyaltyInfoOpenseaChapter1 = class LoyaltyInfoOpenseaChapter1 {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyInfoOpenseaChapter1.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyInfoOpenseaChapter1.prototype, "rank", void 0);
LoyaltyInfoOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)()
], LoyaltyInfoOpenseaChapter1);
var ChestRankOpenseaChapter1;
(function (ChestRankOpenseaChapter1) {
    ChestRankOpenseaChapter1["BRONZE_3"] = "BRONZE_3";
    ChestRankOpenseaChapter1["SILVER_1"] = "SILVER_1";
    ChestRankOpenseaChapter1["GOLD_3"] = "GOLD_3";
})(ChestRankOpenseaChapter1 || (exports.ChestRankOpenseaChapter1 = ChestRankOpenseaChapter1 = {}));
(0, graphql_1.registerEnumType)(ChestRankOpenseaChapter1, {
    name: 'ChestRankOpenseaChapter1',
});
let AirdropChestByRankOpenseaChapter1 = class AirdropChestByRankOpenseaChapter1 {
};
exports.AirdropChestByRankOpenseaChapter1 = AirdropChestByRankOpenseaChapter1;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRankOpenseaChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRankOpenseaChapter1.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], AirdropChestByRankOpenseaChapter1.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRankOpenseaChapter1.prototype, "status", void 0);
exports.AirdropChestByRankOpenseaChapter1 = AirdropChestByRankOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)()
], AirdropChestByRankOpenseaChapter1);
let ChestsByRankOpenseaChapter1 = class ChestsByRankOpenseaChapter1 {
};
exports.ChestsByRankOpenseaChapter1 = ChestsByRankOpenseaChapter1;
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRankOpenseaChapter1], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRankOpenseaChapter1.prototype, "BRONZE_3", void 0);
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRankOpenseaChapter1], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRankOpenseaChapter1.prototype, "SILVER_1", void 0);
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRankOpenseaChapter1], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRankOpenseaChapter1.prototype, "GOLD_3", void 0);
exports.ChestsByRankOpenseaChapter1 = ChestsByRankOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)()
], ChestsByRankOpenseaChapter1);
let UserAirdropChestLoyaltyOpenseaChapter1 = class UserAirdropChestLoyaltyOpenseaChapter1 {
};
exports.UserAirdropChestLoyaltyOpenseaChapter1 = UserAirdropChestLoyaltyOpenseaChapter1;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserAirdropChestLoyaltyOpenseaChapter1.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.AirdropTierOpenseaChapter1),
    __metadata("design:type", tables_1.AirdropTierOpenseaChapter1)
], UserAirdropChestLoyaltyOpenseaChapter1.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)(() => ChestsByRankOpenseaChapter1),
    __metadata("design:type", ChestsByRankOpenseaChapter1)
], UserAirdropChestLoyaltyOpenseaChapter1.prototype, "chestsByRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => LoyaltyInfoOpenseaChapter1),
    __metadata("design:type", LoyaltyInfoOpenseaChapter1)
], UserAirdropChestLoyaltyOpenseaChapter1.prototype, "loyalty", void 0);
exports.UserAirdropChestLoyaltyOpenseaChapter1 = UserAirdropChestLoyaltyOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)()
], UserAirdropChestLoyaltyOpenseaChapter1);
//# sourceMappingURL=UserAirdropChestOpenseaChapter1.view.js.map