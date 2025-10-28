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
exports.CollectionMetadataSyncer = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let CollectionMetadataSyncer = class CollectionMetadataSyncer extends typeorm_1.BaseEntity {
};
exports.CollectionMetadataSyncer = CollectionMetadataSyncer;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('char', { length: 40 }),
    __metadata("design:type", String)
], CollectionMetadataSyncer.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer', { default: 0 }),
    __metadata("design:type", Number)
], CollectionMetadataSyncer.prototype, "visited", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], CollectionMetadataSyncer.prototype, "proceed", void 0);
exports.CollectionMetadataSyncer = CollectionMetadataSyncer = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'collection_metadata_syncer' }),
    (0, typeorm_1.Index)(['proceed']),
    (0, typeorm_1.Index)(['visited'])
], CollectionMetadataSyncer);
//# sourceMappingURL=CollectionMetadataSyncer.entity.js.map