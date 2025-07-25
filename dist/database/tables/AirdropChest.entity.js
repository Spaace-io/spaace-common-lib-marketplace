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
exports.AirdropChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let AirdropChest = class AirdropChest extends typeorm_1.BaseEntity {
};
exports.AirdropChest = AirdropChest;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropChest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropChestsType),
    (0, typeorm_1.Column)('enum', { enum: Airdrops_enum_1.AirdropChestsType, enumName: 'airdrop_chests_type' }),
    __metadata("design:type", String)
], AirdropChest.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], AirdropChest.prototype, "valueXp", void 0);
exports.AirdropChest = AirdropChest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_chests' })
], AirdropChest);
//# sourceMappingURL=AirdropChest.entity.js.map