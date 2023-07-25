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
exports.referrer1690306162678 = void 0;
class referrer1690306162678 {
    constructor() {
        this.name = 'referrer1690306162678';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "referrerAddress" character(40)`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727" FOREIGN KEY ("referrerAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referrerAddress"`);
        });
    }
}
exports.referrer1690306162678 = referrer1690306162678;
//# sourceMappingURL=1690306162678-referrer.js.map