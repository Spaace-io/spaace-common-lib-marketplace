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
exports.Transfer = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)
let Transfer = class Transfer extends Event_1.Event {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], Transfer.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Transfer.prototype, "logIdx", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], Transfer.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", String)
], Transfer.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], Transfer.prototype, "amount", void 0);
Transfer = __decorate([
    (0, typeorm_1.Entity)({ name: 'transfers' })
], Transfer);
exports.Transfer = Transfer;
//# sourceMappingURL=Transfer.entity.js.map