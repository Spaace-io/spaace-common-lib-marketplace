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
exports.UserCollectionRoyaltyTrackBlock = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let UserCollectionRoyaltyTrackBlock = class UserCollectionRoyaltyTrackBlock extends typeorm_1.BaseEntity {
};
exports.UserCollectionRoyaltyTrackBlock = UserCollectionRoyaltyTrackBlock;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserCollectionRoyaltyTrackBlock.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('bigint', { default: 0 }),
    __metadata("design:type", Number)
], UserCollectionRoyaltyTrackBlock.prototype, "lastProcessedId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamptz', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserCollectionRoyaltyTrackBlock.prototype, "updatedAt", void 0);
exports.UserCollectionRoyaltyTrackBlock = UserCollectionRoyaltyTrackBlock = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_collection_royalty_track_block' })
], UserCollectionRoyaltyTrackBlock);
//# sourceMappingURL=UserCollectionRoyaltyTrackBlock.entity.js.map