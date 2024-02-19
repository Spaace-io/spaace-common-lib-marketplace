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
exports.AddReferralCodeInArenaUser1708347976438 = void 0;
class AddReferralCodeInArenaUser1708347976438 {
    constructor() {
        this.name = 'AddReferralCodeInArenaUser1708347976438';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_users" ("twitterUsername" text NOT NULL, "name" text, "imageUrl" text, "referralCode" text NOT NULL, "referrerUsername" text, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac" UNIQUE ("referralCode"), CONSTRAINT "PK_5369e233e18e92fecb08b7991a5" PRIMARY KEY ("twitterUsername"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e97776d3e4e59017d57714bf39c" FOREIGN KEY ("referrerUsername") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e97776d3e4e59017d57714bf39c"`);
            yield queryRunner.query(`DROP TABLE "arena_users"`);
        });
    }
}
exports.AddReferralCodeInArenaUser1708347976438 = AddReferralCodeInArenaUser1708347976438;
//# sourceMappingURL=1708347976438-addReferralCodeInArenaUser.js.map