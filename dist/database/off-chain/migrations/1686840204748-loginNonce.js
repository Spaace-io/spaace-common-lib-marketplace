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
exports.loginNonce1686840204748 = void 0;
class loginNonce1686840204748 {
    constructor() {
        this.name = 'loginNonce1686840204748';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "login_nonce" DROP CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6"`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" RENAME COLUMN "user" TO "address"`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" ALTER COLUMN "address" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "login_nonce" ALTER COLUMN "address" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" RENAME COLUMN "address" TO "user"`);
            yield queryRunner.query(`ALTER TABLE "login_nonce" ADD CONSTRAINT "FK_4137d2aae20dffff1f82a7284c6" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.loginNonce1686840204748 = loginNonce1686840204748;
//# sourceMappingURL=1686840204748-loginNonce.js.map