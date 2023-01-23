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
exports.Volume7d = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
let Volume7d = class Volume7d extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume7d.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume7d.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], Volume7d.prototype, "bucket", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume7d.prototype, "volume", void 0);
Volume7d = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.Sale, 'sale')
                .select('"collection"')
                .addSelect('"currency"')
                .addSelect('FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (7 * 24 * 60 * 60))', 'bucket')
                .addSelect('SUM("price")', 'volume')
                .where('"timestamp" > NOW() - INTERVAL \'14 days\'')
                .groupBy('"collection"')
                .addGroupBy('"currency"')
                .addGroupBy('"bucket"');
        },
    })
], Volume7d);
exports.Volume7d = Volume7d;
//# sourceMappingURL=Volume7d.view.js.map