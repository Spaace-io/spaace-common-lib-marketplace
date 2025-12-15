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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const AccessLevel_enum_1 = require("../enums/AccessLevel.enum");
const EmailStatus_enum_1 = require("../enums/EmailStatus.enum");
const UserStatus_enum_1 = require("../enums/UserStatus.enum");
const Tournaments_entity_1 = require("./Tournaments.entity");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true, unique: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "pendingEmail", void 0);
__decorate([
    (0, graphql_1.Field)(() => EmailStatus_enum_1.EmailStatus),
    (0, typeorm_1.Column)({ type: 'enum', enum: EmailStatus_enum_1.EmailStatus, default: EmailStatus_enum_1.EmailStatus.UNSET }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", String)
], User.prototype, "emailStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "emailVerifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "emailVerificationTokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "emailVerificationExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "emailVerificationLastSentAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "biography", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], User.prototype, "admin", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { unique: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('char', { length: 40, nullable: true }),
    (0, typeorm_1.ManyToOne)(() => User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'referrerAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "referrerAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => AccessLevel_enum_1.AccessLevel),
    (0, typeorm_1.Column)('enum', {
        enum: AccessLevel_enum_1.AccessLevel,
        enumName: 'access_level',
        default: AccessLevel_enum_1.AccessLevel.LOCKED,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "accessLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], User.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "twitterUsername", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "twitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "twitterSecretToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "twitterAccessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "sharedAirdropOGImage", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "sharedReferralImage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Boolean)
], User.prototype, "checkedAirdropChapter0", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Boolean)
], User.prototype, "checkedAirdropChapter1", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Boolean)
], User.prototype, "checkedAirdropOpenseaChapter1", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "discordId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "discordUsername", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "discordAccessToken", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], User.prototype, "discordRefreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAmbassador", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 32, nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "referralStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserStatus_enum_1.UserStatus),
    (0, typeorm_1.Index)('idx_users_status'),
    (0, typeorm_1.Column)('enum', {
        enum: UserStatus_enum_1.UserStatus,
        enumName: 'users_status_enum',
        default: UserStatus_enum_1.UserStatus.ACTIVE,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, typeorm_1.Column)('integer', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "abuseScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "abuseReason", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], User.prototype, "checkedAbuseReport", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], User.prototype, "statusUpdatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 45, nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "creationIP", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "creationFingerprint", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 45, nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "lastConnectionIP", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], User.prototype, "lastConnectionAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Tournaments_entity_1.TournamentResult]),
    (0, typeorm_1.OneToMany)(() => Tournaments_entity_1.TournamentResult, (tournamentResult) => tournamentResult.user, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "tournamentResults", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Tournaments_entity_1.TournamentParticipant]),
    (0, typeorm_1.OneToMany)(() => Tournaments_entity_1.TournamentParticipant, (tournamentParticipant) => tournamentParticipant.user, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "tournamentParticipants", void 0);
exports.User = User = __decorate([
    (0, class_transformer_1.Exclude)(),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=User.entity.js.map