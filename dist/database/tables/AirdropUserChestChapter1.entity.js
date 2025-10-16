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
exports.AirdropUserChestChapter1 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropUserChapter1_entity_1 = require("./AirdropUserChapter1.entity");
const AirdropChestChapter1_entity_1 = require("./AirdropChestChapter1.entity");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let AirdropUserChestChapter1 = class AirdropUserChestChapter1 extends typeorm_1.BaseEntity {
};
exports.AirdropUserChestChapter1 = AirdropUserChestChapter1;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUserChestChapter1.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar'),
    (0, typeorm_1.ManyToOne)(() => AirdropUserChapter1_entity_1.AirdropUserChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], AirdropUserChestChapter1.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChestChapter1_entity_1.AirdropChestChapter1, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUserChestChapter1.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropUsersChestsStatusChapter1),
    (0, typeorm_1.Column)('enum', {
        enum: Airdrops_enum_1.AirdropUsersChestsStatusChapter1,
        enumName: 'users_chests_status_chapter1',
        default: Airdrops_enum_1.AirdropUsersChestsStatusChapter1.UNLOCKED,
    }),
    __metadata("design:type", String)
], AirdropUserChestChapter1.prototype, "status", void 0);
exports.AirdropUserChestChapter1 = AirdropUserChestChapter1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users_chests_chapter1' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_chapter1_address', ['address']),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_chapter1_status', ['status'])
], AirdropUserChestChapter1);
//# sourceMappingURL=AirdropUserChestChapter1.entity.js.map