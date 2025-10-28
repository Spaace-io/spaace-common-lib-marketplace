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
exports.UserConnectionLog = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
let UserConnectionLog = class UserConnectionLog extends typeorm_1.BaseEntity {
};
exports.UserConnectionLog = UserConnectionLog;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserConnectionLog.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], UserConnectionLog.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar', { length: 45 }),
    __metadata("design:type", String)
], UserConnectionLog.prototype, "ipAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: true }),
    __metadata("design:type", Object)
], UserConnectionLog.prototype, "fingerprint", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('varchar', { length: 50 }),
    __metadata("design:type", String)
], UserConnectionLog.prototype, "actionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], UserConnectionLog.prototype, "actionData", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamptz', { default: () => 'NOW()' }),
    __metadata("design:type", Date)
], UserConnectionLog.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], UserConnectionLog.prototype, "suspicious", void 0);
exports.UserConnectionLog = UserConnectionLog = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_connection_logs' }),
    (0, typeorm_1.Index)(['userAddress', 'timestamp']),
    (0, typeorm_1.Index)(['ipAddress']),
    (0, typeorm_1.Index)(['fingerprint']),
    (0, typeorm_1.Index)(['actionType']),
    (0, typeorm_1.Index)(['suspicious'], { where: '"suspicious" = true' })
], UserConnectionLog);
//# sourceMappingURL=UserConnectionLog.entity.js.map