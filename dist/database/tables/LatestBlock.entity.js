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
exports.LatestBlockEntity = void 0;
const typeorm_1 = require("typeorm");
let LatestBlockEntity = class LatestBlockEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ default: true }),
    (0, typeorm_1.Check)('pk = TRUE'),
    __metadata("design:type", Boolean)
], LatestBlockEntity.prototype, "pk", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", Number)
], LatestBlockEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)('char', { length: 64 }),
    __metadata("design:type", String)
], LatestBlockEntity.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LatestBlockEntity.prototype, "timestamp", void 0);
LatestBlockEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'latest_block' })
], LatestBlockEntity);
exports.LatestBlockEntity = LatestBlockEntity;
//# sourceMappingURL=LatestBlock.entity.js.map