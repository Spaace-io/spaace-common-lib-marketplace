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
exports.AirdropUserChapter1 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropTierChapter1_entity_1 = require("./AirdropTierChapter1.entity");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
let AirdropUserChapter1 = class AirdropUserChapter1 extends typeorm_1.BaseEntity {
};
exports.AirdropUserChapter1 = AirdropUserChapter1;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUserChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], AirdropUserChapter1.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropTierChapter1_entity_1.AirdropTierChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tierId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUserChapter1.prototype, "tierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', {
        enum: SeasonRank_entity_1.LoyaltyRank,
        enumName: 'rank',
        default: SeasonRank_entity_1.LoyaltyRank.BRONZE_4,
    }),
    __metadata("design:type", String)
], AirdropUserChapter1.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], AirdropUserChapter1.prototype, "points", void 0);
exports.AirdropUserChapter1 = AirdropUserChapter1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users_chapter1' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_chapter1_address', ['address'])
], AirdropUserChapter1);
//# sourceMappingURL=AirdropUserChapter1.entity.js.map