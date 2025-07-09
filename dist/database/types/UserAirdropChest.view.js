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
exports.UserAirdropChestLoyalty = exports.ChestsByRank = exports.AirdropChestByRank = exports.ChestRank = exports.UserAirdropChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const tables_1 = require("../tables");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let UserAirdropChest = class UserAirdropChest extends typeorm_1.BaseEntity {
};
exports.UserAirdropChest = UserAirdropChest;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserAirdropChest.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.AirdropTier),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", tables_1.AirdropTier)
], UserAirdropChest.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)(() => [tables_1.AirdropChest]),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], UserAirdropChest.prototype, "chests", void 0);
exports.UserAirdropChest = UserAirdropChest = __decorate([
    (0, graphql_1.ObjectType)(),
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
                .from('airdrop_user_chest', 'user_chest')
                .innerJoin('airdrop_chest', 'chest', 'chest.id = user_chest.chest_id')
                .innerJoin('airdrop_tier', 'chest_tier', 'chest_tier.id = chest.tier_id')
                .where('user_chest.user_address = user.address'), 'chests')
                .from('airdrop_user', 'user')
                .innerJoin('airdrop_tier', 'tier', 'tier.id = user.tier_id');
        },
        name: 'user_airdrop_chest_view',
    })
], UserAirdropChest);
let LoyaltyInfo = class LoyaltyInfo {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyInfo.prototype, "points", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyInfo.prototype, "rank", void 0);
LoyaltyInfo = __decorate([
    (0, graphql_1.ObjectType)()
], LoyaltyInfo);
var ChestRank;
(function (ChestRank) {
    ChestRank["BRONZE_3"] = "BRONZE_3";
    ChestRank["SILVER_1"] = "SILVER_1";
    ChestRank["GOLD_3"] = "GOLD_3";
})(ChestRank || (exports.ChestRank = ChestRank = {}));
(0, graphql_1.registerEnumType)(ChestRank, {
    name: 'ChestRank',
});
let AirdropChestByRank = class AirdropChestByRank {
};
exports.AirdropChestByRank = AirdropChestByRank;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRank.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRank.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], AirdropChestByRank.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AirdropChestByRank.prototype, "status", void 0);
exports.AirdropChestByRank = AirdropChestByRank = __decorate([
    (0, graphql_1.ObjectType)()
], AirdropChestByRank);
let ChestsByRank = class ChestsByRank {
};
exports.ChestsByRank = ChestsByRank;
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRank], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRank.prototype, "BRONZE_3", void 0);
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRank], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRank.prototype, "SILVER_1", void 0);
__decorate([
    (0, graphql_1.Field)(() => [AirdropChestByRank], { nullable: true }),
    __metadata("design:type", Array)
], ChestsByRank.prototype, "GOLD_3", void 0);
exports.ChestsByRank = ChestsByRank = __decorate([
    (0, graphql_1.ObjectType)()
], ChestsByRank);
let UserAirdropChestLoyalty = class UserAirdropChestLoyalty {
};
exports.UserAirdropChestLoyalty = UserAirdropChestLoyalty;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserAirdropChestLoyalty.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => tables_1.AirdropTier),
    __metadata("design:type", tables_1.AirdropTier)
], UserAirdropChestLoyalty.prototype, "tier", void 0);
__decorate([
    (0, graphql_1.Field)(() => ChestsByRank),
    __metadata("design:type", ChestsByRank)
], UserAirdropChestLoyalty.prototype, "chestsByRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => LoyaltyInfo),
    __metadata("design:type", LoyaltyInfo)
], UserAirdropChestLoyalty.prototype, "loyalty", void 0);
exports.UserAirdropChestLoyalty = UserAirdropChestLoyalty = __decorate([
    (0, graphql_1.ObjectType)()
], UserAirdropChestLoyalty);
//# sourceMappingURL=UserAirdropChest.view.js.map