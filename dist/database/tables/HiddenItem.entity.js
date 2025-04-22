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
exports.HiddenItem = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let HiddenItem = class HiddenItem extends typeorm_1.BaseEntity {
};
exports.HiddenItem = HiddenItem;
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => _1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], HiddenItem.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], HiddenItem.prototype, "collectionAddress", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ItemEntity),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    __metadata("design:type", String)
], HiddenItem.prototype, "tokenId", void 0);
exports.HiddenItem = HiddenItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'hidden_items' }),
    (0, typeorm_1.Index)(['userAddress', 'collectionAddress', 'tokenId'], { unique: true })
], HiddenItem);
//# sourceMappingURL=HiddenItem.entity.js.map