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
exports.SpotlightCollectionBuyQuest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Quest_entity_1 = require("./Quest.entity");
let SpotlightCollectionBuyQuest = class SpotlightCollectionBuyQuest extends typeorm_1.BaseEntity {
};
exports.SpotlightCollectionBuyQuest = SpotlightCollectionBuyQuest;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SpotlightCollectionBuyQuest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SpotlightCollectionBuyQuest.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], SpotlightCollectionBuyQuest.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], SpotlightCollectionBuyQuest.prototype, "collectionName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SpotlightCollectionBuyQuest.prototype, "questId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Quest_entity_1.Quest, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'questId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Quest_entity_1.Quest)
], SpotlightCollectionBuyQuest.prototype, "quest", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], SpotlightCollectionBuyQuest.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], SpotlightCollectionBuyQuest.prototype, "updatedAt", void 0);
exports.SpotlightCollectionBuyQuest = SpotlightCollectionBuyQuest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'spotlight_collection_buy_quests' }),
    (0, typeorm_1.Unique)('uq_spotlight_collection_buy_quests_season_collection', [
        'seasonNumber',
        'collectionAddress',
    ]),
    (0, typeorm_1.Index)('idx_spotlight_collection_buy_quests_collection', ['collectionAddress']),
    (0, typeorm_1.Index)('idx_spotlight_collection_buy_quests_season', ['seasonNumber'])
], SpotlightCollectionBuyQuest);
//# sourceMappingURL=SpotlightCollectionBuyQuest.entity.js.map