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
exports.UserXpLog = exports.UserXpLogMetadata = exports.UserXpLogSource = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const ethers_1 = require("ethers");
const class_transformer_1 = require("class-transformer");
var UserXpLogSource;
(function (UserXpLogSource) {
    UserXpLogSource["QUEST"] = "QUEST";
    UserXpLogSource["REFERRAL"] = "REFERRAL";
    UserXpLogSource["ADMIN"] = "ADMIN";
    UserXpLogSource["TOURNAMENT"] = "TOURNAMENT";
    UserXpLogSource["RANK_CHEST"] = "RANK_CHEST";
})(UserXpLogSource || (exports.UserXpLogSource = UserXpLogSource = {}));
(0, graphql_1.registerEnumType)(UserXpLogSource, {
    name: 'UserXpLogSource',
});
let UserXpLogMetadata = class UserXpLogMetadata {
};
exports.UserXpLogMetadata = UserXpLogMetadata;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserXpLogMetadata.prototype, "key", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserXpLogMetadata.prototype, "value", void 0);
exports.UserXpLogMetadata = UserXpLogMetadata = __decorate([
    (0, graphql_1.ObjectType)()
], UserXpLogMetadata);
let UserXpLog = class UserXpLog extends typeorm_1.BaseEntity {
};
exports.UserXpLog = UserXpLog;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], UserXpLog.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], UserXpLog.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], UserXpLog.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => _1.Quest, { nullable: true }),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'questId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Object)
], UserXpLog.prototype, "questId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => _1.TournamentsEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tournamentId', referencedColumnName: 'id' }),
    __metadata("design:type", Object)
], UserXpLog.prototype, "tournamentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserXpLogSource),
    (0, typeorm_1.Column)('enum', { enum: UserXpLogSource, enumName: 'user_xp_log_source' }),
    (0, class_validator_1.IsEnum)(UserXpLogSource, {
        message: 'source must be one of the following: QUEST, REFERRAL, ADMIN, TOURNAMENT, RANK_CHEST',
    }),
    __metadata("design:type", String)
], UserXpLog.prototype, "source", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UserXpLogMetadata]),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], UserXpLog.prototype, "metadata", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserXpLog.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], UserXpLog.prototype, "xp", void 0);
exports.UserXpLog = UserXpLog = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_xp_log' }),
    (0, typeorm_1.Index)(['userAddress', 'seasonNumber', 'questId'])
], UserXpLog);
//# sourceMappingURL=UserXpLog.entity.js.map