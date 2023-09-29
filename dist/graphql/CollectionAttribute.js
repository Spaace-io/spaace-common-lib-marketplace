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
exports.CollectionAttribute = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const _1 = require(".");
const ethers_1 = require("ethers");
let CollectionAttribute = class CollectionAttribute {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CollectionAttribute.prototype, "trait", void 0);
__decorate([
    (0, graphql_1.Field)(() => [_1.CollectionAttributeValue]),
    (0, class_transformer_1.Type)(() => _1.CollectionAttributeValue),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], CollectionAttribute.prototype, "values", void 0);
CollectionAttribute = __decorate([
    (0, graphql_1.ObjectType)()
], CollectionAttribute);
exports.CollectionAttribute = CollectionAttribute;
//# sourceMappingURL=CollectionAttribute.js.map