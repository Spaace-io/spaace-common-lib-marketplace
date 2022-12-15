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
exports.createLatestBlock1671117193530 = void 0;
class createLatestBlock1671117193530 {
    constructor() {
        this.name = 'createLatestBlock1671117193530';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "latest_block" ("pk" boolean NOT NULL DEFAULT true, "number" integer NOT NULL, "hash" character(64) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b31af3e9abf8a0d5b6984dff44" PRIMARY KEY ("pk"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "latest_block"`);
        });
    }
}
exports.createLatestBlock1671117193530 = createLatestBlock1671117193530;
//# sourceMappingURL=1671117193530-createLatestBlock.js.map