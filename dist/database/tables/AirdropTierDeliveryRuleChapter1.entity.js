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
exports.AirdropTierDeliveryRuleChapter1 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropTierChapter1_entity_1 = require("./AirdropTierChapter1.entity");
const AirdropChestChapter1_entity_1 = require("./AirdropChestChapter1.entity");
let AirdropTierDeliveryRuleChapter1 = class AirdropTierDeliveryRuleChapter1 extends typeorm_1.BaseEntity {
};
exports.AirdropTierDeliveryRuleChapter1 = AirdropTierDeliveryRuleChapter1;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropTierChapter1_entity_1.AirdropTierChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tierId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter1.prototype, "tierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChestChapter1_entity_1.AirdropChestChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter1.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], AirdropTierDeliveryRuleChapter1.prototype, "count", void 0);
exports.AirdropTierDeliveryRuleChapter1 = AirdropTierDeliveryRuleChapter1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_tiers_delivery_rules_chapter1' })
], AirdropTierDeliveryRuleChapter1);
//# sourceMappingURL=AirdropTierDeliveryRuleChapter1.entity.js.map