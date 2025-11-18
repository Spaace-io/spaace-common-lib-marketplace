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
exports.AirdropUserChestOpenseaChapter1 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropUserOpenseaChapter1_entity_1 = require("./AirdropUserOpenseaChapter1.entity");
const AirdropChestOpenseaChapter1_entity_1 = require("./AirdropChestOpenseaChapter1.entity");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
let AirdropUserChestOpenseaChapter1 = class AirdropUserChestOpenseaChapter1 extends typeorm_1.BaseEntity {
};
exports.AirdropUserChestOpenseaChapter1 = AirdropUserChestOpenseaChapter1;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUserChestOpenseaChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar'),
    (0, typeorm_1.ManyToOne)(() => AirdropUserOpenseaChapter1_entity_1.AirdropUserOpenseaChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], AirdropUserChestOpenseaChapter1.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChestOpenseaChapter1_entity_1.AirdropChestOpenseaChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUserChestOpenseaChapter1.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropUsersChestsStatusOpenseaChapter1),
    (0, typeorm_1.Column)('enum', {
        enum: Airdrops_enum_1.AirdropUsersChestsStatusOpenseaChapter1,
        enumName: 'users_chests_status_opensea_chapter1',
        default: Airdrops_enum_1.AirdropUsersChestsStatusOpenseaChapter1.LOCKED,
    }),
    __metadata("design:type", String)
], AirdropUserChestOpenseaChapter1.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', {
        enum: SeasonRank_entity_1.LoyaltyRank,
        enumName: 'airdrop_users_chests_rank',
        default: SeasonRank_entity_1.LoyaltyRank.BRONZE_5,
    }),
    __metadata("design:type", String)
], AirdropUserChestOpenseaChapter1.prototype, "rank", void 0);
exports.AirdropUserChestOpenseaChapter1 = AirdropUserChestOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users_chests_opensea_chapter1' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_opensea_chapter1_address', ['address']),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_opensea_chapter1_status', ['status'])
], AirdropUserChestOpenseaChapter1);
//# sourceMappingURL=AirdropUserChestOpenseaChapter1.entity.js.map