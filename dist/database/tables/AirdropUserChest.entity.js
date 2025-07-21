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
exports.AirdropUserChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropUser_entity_1 = require("./AirdropUser.entity");
const AirdropChest_entity_1 = require("./AirdropChest.entity");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
let AirdropUserChest = class AirdropUserChest extends typeorm_1.BaseEntity {
};
exports.AirdropUserChest = AirdropUserChest;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUserChest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar'),
    (0, typeorm_1.ManyToOne)(() => AirdropUser_entity_1.AirdropUser, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], AirdropUserChest.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChest_entity_1.AirdropChest, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUserChest.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropUsersChestsStatus),
    (0, typeorm_1.Column)('enum', {
        enum: Airdrops_enum_1.AirdropUsersChestsStatus,
        enumName: 'users_chests_status',
        default: Airdrops_enum_1.AirdropUsersChestsStatus.LOCKED,
    }),
    __metadata("design:type", String)
], AirdropUserChest.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', {
        enum: SeasonRank_entity_1.LoyaltyRank,
        enumName: 'airdrop_users_chests_rank',
        default: SeasonRank_entity_1.LoyaltyRank.BRONZE_5,
    }),
    __metadata("design:type", String)
], AirdropUserChest.prototype, "rank", void 0);
exports.AirdropUserChest = AirdropUserChest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users_chests' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_address', ['address']),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_status', ['status'])
], AirdropUserChest);
//# sourceMappingURL=AirdropUserChest.entity.js.map