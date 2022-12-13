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
exports.init1670942106536 = void 0;
class init1670942106536 {
    constructor() {
        this.name = 'init1670942106536';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "transfers" ("hash" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "collection" character varying NOT NULL, "item" numeric(78), "amount" numeric(78), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b26bd57c48ad9c485a3ae3e3635" PRIMARY KEY ("hash"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "transfers"`);
        });
    }
}
exports.init1670942106536 = init1670942106536;
//# sourceMappingURL=1670942106536-init.js.map