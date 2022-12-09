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
exports.Item = exports.Medias = void 0;
var typeorm_1 = require("typeorm");
var Collection_entity_1 = require("./Collection.entity");
var Medias = /** @class */ (function () {
    function Medias() {
    }
    return Medias;
}());
exports.Medias = Medias;
var Item = /** @class */ (function () {
    function Item() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Item.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Collection_entity_1.Collection; }, function (collection) { return collection.items; }, { eager: true }),
        __metadata("design:type", Collection_entity_1.Collection)
    ], Item.prototype, "collection", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "tokenId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Item.prototype, "isRefreshed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Date)
    ], Item.prototype, "lastTimeUpdate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "tokenUri", void 0);
    __decorate([
        (0, typeorm_1.Column)('jsonb', { nullable: true }),
        __metadata("design:type", Object)
    ], Item.prototype, "attributes", void 0);
    __decorate([
        (0, typeorm_1.Column)('jsonb', { nullable: true }),
        __metadata("design:type", Object)
    ], Item.prototype, "medias", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: function () { return 'CURRENT_TIMESTAMP'; }, nullable: true }),
        __metadata("design:type", Date)
    ], Item.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: function () { return 'CURRENT_TIMESTAMP'; }, nullable: true }),
        __metadata("design:type", Date)
    ], Item.prototype, "updated_at", void 0);
    Item = __decorate([
        (0, typeorm_1.Entity)({ name: "items" })
    ], Item);
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.entity.js.map