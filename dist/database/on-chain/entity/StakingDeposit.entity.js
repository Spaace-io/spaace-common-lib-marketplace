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
exports.StakingDeposit = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let StakingDeposit = class StakingDeposit extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "pool", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)('numeric', { precision: 78 }),
    __metadata("design:type", String)
], StakingDeposit.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], StakingDeposit.prototype, "date", void 0);
StakingDeposit = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'staking_deposits' })
], StakingDeposit);
exports.StakingDeposit = StakingDeposit;
//# sourceMappingURL=StakingDeposit.entity.js.map