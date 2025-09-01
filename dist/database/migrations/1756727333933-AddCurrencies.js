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
exports.AddCurrencies1756727333933 = void 0;
class AddCurrencies1756727333933 {
    constructor() {
        this.name = 'AddCurrencies1756727333933';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "token_prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "symbol" character varying(32) NOT NULL, "vsCurrency" character varying(16) NOT NULL, "price" numeric(36,18) NOT NULL, "bucketedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_42e2a1a31b88976beb8421f80f9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_2d96136f2a0593b1dfca5ceb0d" ON "token_prices" ("symbol", "vsCurrency") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_2d96136f2a0593b1dfca5ceb0d"`);
            yield queryRunner.query(`DROP TABLE "token_prices"`);
        });
    }
}
exports.AddCurrencies1756727333933 = AddCurrencies1756727333933;
//# sourceMappingURL=1756727333933-AddCurrencies.js.map