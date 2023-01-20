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
exports.LastRefresh = void 0;
const typeorm_1 = require("typeorm");
let LastRefresh = class LastRefresh extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ default: true }),
    (0, typeorm_1.Check)('pk = TRUE'),
    __metadata("design:type", Boolean)
], LastRefresh.prototype, "pk", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], LastRefresh.prototype, "timestamp", void 0);
LastRefresh = __decorate([
    (0, typeorm_1.Entity)({ name: 'last_refresh' })
], LastRefresh);
exports.LastRefresh = LastRefresh;
//# sourceMappingURL=LastRefresh.entity.js.map