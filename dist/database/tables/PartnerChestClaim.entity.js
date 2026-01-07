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
exports.PartnerChestClaim = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const PartnerChestUnlockLevel_enum_1 = require("../enums/PartnerChestUnlockLevel.enum");
const PartnerChestUserRun_entity_1 = require("./PartnerChestUserRun.entity");
let PartnerChestClaim = class PartnerChestClaim extends typeorm_1.BaseEntity {
};
exports.PartnerChestClaim = PartnerChestClaim;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PartnerChestClaim.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PartnerChestClaim.prototype, "userRunId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PartnerChestUserRun_entity_1.PartnerChestUserRun, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userRunId', referencedColumnName: 'id' }),
    __metadata("design:type", PartnerChestUserRun_entity_1.PartnerChestUserRun)
], PartnerChestClaim.prototype, "userRun", void 0);
__decorate([
    (0, graphql_1.Field)(() => PartnerChestUnlockLevel_enum_1.PartnerChestUnlockLevel),
    (0, typeorm_1.Column)('enum', {
        enum: PartnerChestUnlockLevel_enum_1.PartnerChestUnlockLevel,
        enumName: 'partner_chest_unlock_level_enum',
    }),
    __metadata("design:type", String)
], PartnerChestClaim.prototype, "unlockLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], PartnerChestClaim.prototype, "claimedAt", void 0);
exports.PartnerChestClaim = PartnerChestClaim = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'partner_chest_claims' }),
    (0, typeorm_1.Unique)('uq_partner_chest_claim_user_run_level', ['userRunId', 'unlockLevel']),
    (0, typeorm_1.Index)(['userRunId'])
], PartnerChestClaim);
//# sourceMappingURL=PartnerChestClaim.entity.js.map