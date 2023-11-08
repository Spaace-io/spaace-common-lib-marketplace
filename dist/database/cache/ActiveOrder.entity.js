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
exports.ActiveOrderCached = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("..");
const utils = require("../../utils");
let ActiveOrderCached = class ActiveOrderCached extends __1.OrderEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('char', { length: 64 }),
    (0, typeorm_1.ManyToOne)(() => __1.OrderEntity),
    (0, typeorm_1.JoinColumn)({ name: 'hash', referencedColumnName: 'hash' }),
    __metadata("design:type", String)
], ActiveOrderCached.prototype, "hash", void 0);
ActiveOrderCached = __decorate([
    (0, typeorm_1.Entity)({ name: 'active_orders_cache' }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'price'], {
        where: `"type" = '${__1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'endTime'], {
        where: `"type" = '${__1.OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'price'], {
        where: `"type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}') AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'price'], {
        where: `"type" = '${__1.OrderType.BID}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    }),
    (0, typeorm_1.Index)(['collectionAddress', 'tokenId', 'endTime'], {
        where: `"type" = '${__1.OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
    })
], ActiveOrderCached);
exports.ActiveOrderCached = ActiveOrderCached;
//# sourceMappingURL=ActiveOrder.entity.js.map