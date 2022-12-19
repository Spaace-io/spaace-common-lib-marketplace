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
exports.init1670944459545 = void 0;
class init1670944459545 {
    constructor() {
        this.name = 'init1670944459545';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "transfers" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "collection" character(40) NOT NULL, "item" numeric(78), "amount" numeric(78), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dbae301f250e9d4435104066841" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`SELECT create_hypertable('transfers', 'timestamp');`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "transfers"`);
        });
    }
}
exports.init1670944459545 = init1670944459545;
//# sourceMappingURL=1670944459545-init.js.map