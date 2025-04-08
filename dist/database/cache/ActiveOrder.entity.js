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
exports.ActiveOrderCachedEntity = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const utils = require("../../utils");
const enums_1 = require("../enums");
let ActiveOrderCachedEntity = class ActiveOrderCachedEntity extends __1.OrderEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    __metadata("design:type", String)
], ActiveOrderCachedEntity.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('timestamp without time zone'),
    __metadata("design:type", Date)
], ActiveOrderCachedEntity.prototype, "endTime", void 0);
ActiveOrderCachedEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'active_orders_cache' }),
    (0, typeorm_1.Index)(['collectionAddress', 'marketplace']),
    (0, typeorm_1.Index)('active_orders_cache_endTime_idx', 
    // ['endTime DESC'],
    {
        synchronize: false,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" IN ('${enums_1.OrderType.ASK}', '${enums_1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'perUnitPrice'], {
        where: `"type" IN ('${enums_1.OrderType.ASK}', '${enums_1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" = '${enums_1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'perUnitPrice'], {
        where: `"type" = '${enums_1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'endTime'], {
        where: `"type" = '${enums_1.OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'endTime'], {
        where: `"type" IN ('${enums_1.OrderType.ASK}', '${enums_1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    })
], ActiveOrderCachedEntity);
exports.ActiveOrderCachedEntity = ActiveOrderCachedEntity;
//# sourceMappingURL=ActiveOrder.entity.js.map