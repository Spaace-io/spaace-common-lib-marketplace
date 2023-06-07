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
exports.addLoginNonce1686153073505 = void 0;
class addLoginNonce1686153073505 {
    constructor() {
        this.name = 'addLoginNonce1686153073505';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "login_nonce" ("nonce" character(32) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "user" character(40), CONSTRAINT "PK_b563be4d1127e83321bd33c9d16" PRIMARY KEY ("nonce"))`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" ADD CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6"`);
            yield queryRunner.query(`DROP TABLE "login_nonce"`);
        });
    }
}
exports.addLoginNonce1686153073505 = addLoginNonce1686153073505;
//# sourceMappingURL=1686153073505-addLoginNonce.js.map