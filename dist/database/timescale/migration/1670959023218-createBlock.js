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
exports.createBlock1670959023218 = void 0;
class createBlock1670959023218 {
    constructor() {
        this.name = 'createBlock1670959023218';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "blocks" ("number" integer NOT NULL, "hash" character(64) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c0b8f5cedabb33e58a625f8a7e" PRIMARY KEY ("number"))`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "item" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "item" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" SET DEFAULT '1'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "amount" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "item" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "transfers" ALTER COLUMN "item" TYPE numeric(78,0)`);
            yield queryRunner.query(`DROP TABLE "blocks"`);
        });
    }
}
exports.createBlock1670959023218 = createBlock1670959023218;
//# sourceMappingURL=1670959023218-createBlock.js.map