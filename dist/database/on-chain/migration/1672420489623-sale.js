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
exports.sale1672420489623 = void 0;
class sale1672420489623 {
    constructor() {
        this.name = 'sale1672420489623';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "orderHash" character(64) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "collection" character varying, "tokenId" numeric(78), CONSTRAINT "PK_d03e0258136323c7c6154219c38" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd"`);
            yield queryRunner.query(`DROP TABLE "sales"`);
        });
    }
}
exports.sale1672420489623 = sale1672420489623;
//# sourceMappingURL=1672420489623-sale.js.map