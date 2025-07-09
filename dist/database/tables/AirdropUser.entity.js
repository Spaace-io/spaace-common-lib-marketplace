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
exports.AirdropUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropTier_entity_1 = require("./AirdropTier.entity");
let AirdropUser = class AirdropUser extends typeorm_1.BaseEntity {
};
exports.AirdropUser = AirdropUser;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUser.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar', { unique: true }),
    __metadata("design:type", String)
], AirdropUser.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropTier_entity_1.AirdropTier, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tierId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUser.prototype, "tierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], AirdropUser.prototype, "tierUpgraded", void 0);
exports.AirdropUser = AirdropUser = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_address', ['address'])
], AirdropUser);
//# sourceMappingURL=AirdropUser.entity.js.map