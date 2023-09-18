"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order1688388621733 = void 0;
class order1688388621733 {
    constructor() {
        this.name = 'order1688388621733';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "orders"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "orders" ("hash" character(64) NOT NULL, "user" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78), "isAsk" boolean NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`);
        });
    }
}
exports.order1688388621733 = order1688388621733;
//# sourceMappingURL=1688388621733-order.js.map