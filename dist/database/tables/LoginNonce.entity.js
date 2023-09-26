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
exports.LoginNonce = exports.LOGIN_NONCE_VALID_PERIOD = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const crypto_1 = require("crypto");
const class_transformer_1 = require("class-transformer");
const ethers_1 = require("ethers");
exports.LOGIN_NONCE_VALID_PERIOD = 5 * 60 * 1000;
let LoginNonce = class LoginNonce extends typeorm_1.BaseEntity {
    generateNonce() {
        var _a;
        (_a = this.nonce) !== null && _a !== void 0 ? _a : (this.nonce = (0, crypto_1.randomUUID)().replace(/-/g, ''));
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 32 }),
    __metadata("design:type", String)
], LoginNonce.prototype, "nonce", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 })
    // No foreign key to the User entity because it doesn't exist during the first login
    ,
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], LoginNonce.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LoginNonce.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginNonce.prototype, "generateNonce", null);
LoginNonce = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'login_nonces' })
], LoginNonce);
exports.LoginNonce = LoginNonce;
//# sourceMappingURL=LoginNonce.entity.js.map