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
exports.AirdropChestOpenseaChapter1 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let AirdropChestOpenseaChapter1 = class AirdropChestOpenseaChapter1 extends typeorm_1.BaseEntity {
};
exports.AirdropChestOpenseaChapter1 = AirdropChestOpenseaChapter1;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropChestOpenseaChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropChestsTypeOpenseaChapter1),
    (0, typeorm_1.Column)('enum', {
        enum: Airdrops_enum_1.AirdropChestsTypeOpenseaChapter1,
        enumName: 'airdrop_chests_type_opensea_chapter1',
    }),
    __metadata("design:type", String)
], AirdropChestOpenseaChapter1.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], AirdropChestOpenseaChapter1.prototype, "valueXp", void 0);
exports.AirdropChestOpenseaChapter1 = AirdropChestOpenseaChapter1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_chests_opensea_chapter1' })
], AirdropChestOpenseaChapter1);
//# sourceMappingURL=AirdropChestOpenseaChapter1.entity.js.map