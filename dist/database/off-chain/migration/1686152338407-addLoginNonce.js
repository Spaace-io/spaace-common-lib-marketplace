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
exports.addLoginNonce1686152338407 = void 0;
class addLoginNonce1686152338407 {
    constructor() {
        this.name = 'addLoginNonce1686152338407';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "login_nonce" ("nonce" character(32) NOT NULL, CONSTRAINT "PK_b563be4d1127e83321bd33c9d16" PRIMARY KEY ("nonce"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "PK_b563be4d1127e83321bd33c9d16"`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" DROP COLUMN "nonce"`);
            yield queryRunner.query(`DROP TABLE "login_nonce"`);
        });
    }
}
exports.addLoginNonce1686152338407 = addLoginNonce1686152338407;
//# sourceMappingURL=1686152338407-addLoginNonce.js.map