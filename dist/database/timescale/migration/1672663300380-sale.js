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
exports.sale1672663300380 = void 0;
class sale1672663300380 {
    constructor() {
        this.name = 'sale1672663300380';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "orderHash" character(64) NOT NULL, "collection" character varying NOT NULL, "tokenId" character varying NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "tokenId", "timestamp"))`);
            yield queryRunner.query(`SELECT create_hypertable('sales', 'timestamp');`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "sales"`);
        });
    }
}
exports.sale1672663300380 = sale1672663300380;
//# sourceMappingURL=1672663300380-sale.js.map