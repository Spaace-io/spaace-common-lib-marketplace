"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Collection = exports.CollectionAttributes = exports.CollectionAttribute = void 0;
var typeorm_1 = require("typeorm");
var Item_entity_1 = require("./Item.entity");
var CollectionAttribute = /** @class */ (function () {
    function CollectionAttribute() {
    }
    return CollectionAttribute;
}());
exports.CollectionAttribute = CollectionAttribute;
var CollectionAttributes = /** @class */ (function () {
    function CollectionAttributes() {
    }
    return CollectionAttributes;
}());
exports.CollectionAttributes = CollectionAttributes;
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Collection.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Item_entity_1.Item; }, function (item) { return item.collection; }),
        __metadata("design:type", Array)
    ], Collection.prototype, "items", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "deployedOwner", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "countOwner", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "symbol", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Collection.prototype, "totalSupply", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "tokenType", void 0);
    __decorate([
        (0, typeorm_1.Column)('jsonb', { nullable: true }),
        __metadata("design:type", Array)
    ], Collection.prototype, "abi", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "imageUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: true }),
        __metadata("design:type", Boolean)
    ], Collection.prototype, "active", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Collection.prototype, "verified", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Collection.prototype, "explicit", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "bannerUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Collection.prototype, "highOffer", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: function () { return 'CURRENT_TIMESTAMP'; } }),
        __metadata("design:type", Date)
    ], Collection.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: function () { return 'CURRENT_TIMESTAMP'; } }),
        __metadata("design:type", Date)
    ], Collection.prototype, "updated_at", void 0);
    Collection = __decorate([
        (0, typeorm_1.Entity)({ name: "collections" })
    ], Collection);
    return Collection;
}(typeorm_1.BaseEntity));
exports.Collection = Collection;
//# sourceMappingURL=Collection.entity.js.map