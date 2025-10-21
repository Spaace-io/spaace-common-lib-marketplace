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
exports.UserQuestProcessing = void 0;
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const class_transformer_1 = require("class-transformer");
let UserQuestProcessing = class UserQuestProcessing extends typeorm_1.BaseEntity {
};
exports.UserQuestProcessing = UserQuestProcessing;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserQuestProcessing.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], UserQuestProcessing.prototype, "questId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'text' }),
    __metadata("design:type", String)
], UserQuestProcessing.prototype, "seasonNumber", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'text' }),
    __metadata("design:type", String)
], UserQuestProcessing.prototype, "scopeKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], UserQuestProcessing.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], UserQuestProcessing.prototype, "completedAt", void 0);
exports.UserQuestProcessing = UserQuestProcessing = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_quest_processing' })
], UserQuestProcessing);
//# sourceMappingURL=UserQuestProcessing.entity.js.map