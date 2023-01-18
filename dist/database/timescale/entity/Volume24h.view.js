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
exports.Volume24h = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
let Volume24h = class Volume24h extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume24h.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume24h.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], Volume24h.prototype, "bucket", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Volume24h.prototype, "volume", void 0);
Volume24h = __decorate([
    (0, typeorm_1.ViewEntity)({
        materialized: true,
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(__1.Sale, 'sale')
                .select('"collection"')
                .addSelect('"currency"')
                .addSelect('time_bucket(INTERVAL \'1 day\', "timestamp") AS "bucket"')
                .addSelect('SUM("price")', 'volume')
                .groupBy('"collection"')
                .addGroupBy('"currency"')
                .addGroupBy('"bucket"');
        },
    })
], Volume24h);
exports.Volume24h = Volume24h;
//# sourceMappingURL=Volume24h.view.js.map