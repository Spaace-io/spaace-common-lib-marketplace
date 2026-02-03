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
exports.AirdropUserChestChapter2 = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropUserChapter2_entity_1 = require("./AirdropUserChapter2.entity");
const AirdropChestChapter2_entity_1 = require("./AirdropChestChapter2.entity");
const Airdrops_enum_1 = require("../enums/Airdrops.enum");
let AirdropUserChestChapter2 = class AirdropUserChestChapter2 extends typeorm_1.BaseEntity {
};
exports.AirdropUserChestChapter2 = AirdropUserChestChapter2;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropUserChestChapter2.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar'),
    (0, typeorm_1.ManyToOne)(() => AirdropUserChapter2_entity_1.AirdropUserChapter2, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], AirdropUserChestChapter2.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChestChapter2_entity_1.AirdropChestChapter2, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropUserChestChapter2.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Airdrops_enum_1.AirdropUsersChestsStatusChapter2),
    (0, typeorm_1.Column)('enum', {
        enum: Airdrops_enum_1.AirdropUsersChestsStatusChapter2,
        enumName: 'users_chests_status_chapter2',
        default: Airdrops_enum_1.AirdropUsersChestsStatusChapter2.UNLOCKED,
    }),
    __metadata("design:type", String)
], AirdropUserChestChapter2.prototype, "status", void 0);
exports.AirdropUserChestChapter2 = AirdropUserChestChapter2 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_users_chests_chapter2' }),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_chapter2_address', ['address']),
    (0, typeorm_1.Index)('IDX_airdrop_users_chests_chapter2_status', ['status'])
], AirdropUserChestChapter2);
//# sourceMappingURL=AirdropUserChestChapter2.entity.js.map