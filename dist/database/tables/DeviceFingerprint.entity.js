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
exports.DeviceFingerprint = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let DeviceFingerprint = class DeviceFingerprint extends typeorm_1.BaseEntity {
};
exports.DeviceFingerprint = DeviceFingerprint;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 100 }),
    __metadata("design:type", String)
], DeviceFingerprint.prototype, "fingerprintHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], DeviceFingerprint.prototype, "totalUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], DeviceFingerprint.prototype, "activeUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], DeviceFingerprint.prototype, "bannedUsers", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamptz', { default: () => 'NOW()' }),
    __metadata("design:type", Date)
], DeviceFingerprint.prototype, "firstSeen", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamptz', { default: () => 'NOW()' }),
    __metadata("design:type", Date)
], DeviceFingerprint.prototype, "lastSeen", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], DeviceFingerprint.prototype, "riskScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], DeviceFingerprint.prototype, "suspicious", void 0);
exports.DeviceFingerprint = DeviceFingerprint = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'device_fingerprints' }),
    (0, typeorm_1.Index)(['riskScore']),
    (0, typeorm_1.Index)(['totalUsers']),
    (0, typeorm_1.Index)(['suspicious'], { where: '"suspicious" = true' }),
    (0, typeorm_1.Index)(['lastSeen'])
], DeviceFingerprint);
//# sourceMappingURL=DeviceFingerprint.entity.js.map