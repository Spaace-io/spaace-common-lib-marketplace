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
exports.AirdropTierDeliveryRuleChapter2 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropTierChapter2_entity_1 = require("./AirdropTierChapter2.entity");
const AirdropChestChapter2_entity_1 = require("./AirdropChestChapter2.entity");
let AirdropTierDeliveryRuleChapter2 = class AirdropTierDeliveryRuleChapter2 extends typeorm_1.BaseEntity {
};
exports.AirdropTierDeliveryRuleChapter2 = AirdropTierDeliveryRuleChapter2;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter2.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropTierChapter2_entity_1.AirdropTierChapter2, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tierId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter2.prototype, "tierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChestChapter2_entity_1.AirdropChestChapter2, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter2.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter2.prototype, "count", void 0);
exports.AirdropTierDeliveryRuleChapter2 = AirdropTierDeliveryRuleChapter2 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_tiers_delivery_rules_chapter2' })
], AirdropTierDeliveryRuleChapter2);
//# sourceMappingURL=AirdropTierDeliveryRuleChapter2.entity.js.map