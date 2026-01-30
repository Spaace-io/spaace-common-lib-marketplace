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
exports.SeasonChapter = exports.SeasonChapterKey = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
var SeasonChapterKey;
(function (SeasonChapterKey) {
    SeasonChapterKey["PRE_RESET"] = "PRE_RESET";
    SeasonChapterKey["FINAL_CHAPTER"] = "FINAL_CHAPTER";
    SeasonChapterKey["POST_FINAL_CHAPTER"] = "POST_FINAL_CHAPTER";
    SeasonChapterKey["MANUAL_RESET"] = "MANUAL_RESET";
})(SeasonChapterKey || (exports.SeasonChapterKey = SeasonChapterKey = {}));
(0, graphql_1.registerEnumType)(SeasonChapterKey, {
    name: 'SeasonChapterKey',
});
let SeasonChapter = class SeasonChapter extends typeorm_1.BaseEntity {
};
exports.SeasonChapter = SeasonChapter;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], SeasonChapter.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], SeasonChapter.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], SeasonChapter.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonChapterKey),
    (0, typeorm_1.Column)('enum', {
        enum: SeasonChapterKey,
        enumName: 'season_chapter_key',
    }),
    __metadata("design:type", String)
], SeasonChapter.prototype, "key", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], SeasonChapter.prototype, "startAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SeasonChapter.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SeasonChapter.prototype, "preserveDiscordFloor", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SeasonChapter.prototype, "preserveReferralFloor", void 0);
exports.SeasonChapter = SeasonChapter = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'season_chapters' }),
    (0, typeorm_1.Index)(['seasonNumber', 'key'], { unique: true }),
    (0, typeorm_1.Index)(['seasonNumber', 'startAt'])
], SeasonChapter);
//# sourceMappingURL=SeasonChapter.entity.js.map