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
exports.Report = exports.ReportReason = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const ethers_1 = require("ethers");
const User_entity_1 = require("./User.entity");
const Item_entity_1 = require("./Item.entity");
const Collection_entity_1 = require("./Collection.entity");
var ReportReason;
(function (ReportReason) {
    ReportReason["FAKE"] = "FAKE";
    ReportReason["EXPLICIT"] = "EXPLICIT";
    ReportReason["SPAM"] = "SPAM";
    ReportReason["OTHER"] = "OTHER";
})(ReportReason = exports.ReportReason || (exports.ReportReason = {}));
(0, graphql_1.registerEnumType)(ReportReason, {
    name: 'ReportReason',
});
let Report = class Report extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Report.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Report.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    (0, typeorm_1.ManyToOne)(() => Collection_entity_1.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'collectionAddress', referencedColumnName: 'address' }),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Report.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => Item_entity_1.ItemEntity, { nullable: true }),
    (0, typeorm_1.JoinColumn)([
        { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
        { name: 'tokenId', referencedColumnName: 'tokenId' },
    ]),
    (0, class_transformer_1.Transform)(({ value }) => value === ethers_1.BigNumber.from(2).pow(256).toString() ? null : value, {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Report.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => ReportReason),
    (0, typeorm_1.Column)('enum', { enum: ReportReason, enumName: 'report_reason' }),
    __metadata("design:type", String)
], Report.prototype, "reason", void 0);
Report = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'reports' }),
    (0, typeorm_1.Unique)(['userAddress', 'collectionAddress', 'tokenId'])
], Report);
exports.Report = Report;
//# sourceMappingURL=Report.entity.js.map