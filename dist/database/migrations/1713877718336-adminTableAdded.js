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
exports.AdminTableAdded1713877718336 = void 0;
class AdminTableAdded1713877718336 {
    constructor() {
        this.name = 'AdminTableAdded1713877718336';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_admins" ("twitterUsername" text NOT NULL, "twitterId" text NOT NULL, "twitterPicture" text NOT NULL, "accountCreationDate" TIMESTAMP NOT NULL DEFAULT now(), "twitterSecretToken" text NOT NULL, "twitterAccessToken" text NOT NULL, "walletAddress" text, CONSTRAINT "UQ_8bcd19483ca2f3cce10f5c7c1c5" UNIQUE ("twitterSecretToken"), CONSTRAINT "UQ_9afd302499fb0a4bc6b34ef96f8" UNIQUE ("twitterAccessToken"), CONSTRAINT "PK_22dd9d4a53becb4a0de255e7a16" PRIMARY KEY ("twitterId"))`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP TABLE "arena_admins"`);
        });
    }
}
exports.AdminTableAdded1713877718336 = AdminTableAdded1713877718336;
//# sourceMappingURL=1713877718336-adminTableAdded.js.map