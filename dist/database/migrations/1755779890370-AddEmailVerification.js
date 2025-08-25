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
exports.AddEmailVerification1755779890370 = void 0;
class AddEmailVerification1755779890370 {
    constructor() {
        this.name = 'AddEmailVerification1755779890370';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "pendingEmail" character varying(255)`);
            yield queryRunner.query(`CREATE TYPE "public"."users_emailstatus_enum" AS ENUM('UNSET', 'PENDING', 'VERIFIED')`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "emailStatus" "public"."users_emailstatus_enum" NOT NULL DEFAULT 'UNSET'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "emailVerifiedAt" TIMESTAMP WITH TIME ZONE`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "emailVerificationTokenHash" character varying(128)`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "emailVerificationExpiresAt" TIMESTAMP WITH TIME ZONE`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "emailVerificationLastSentAt" TIMESTAMP WITH TIME ZONE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerificationLastSentAt"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerificationExpiresAt"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerificationTokenHash"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailVerifiedAt"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailStatus"`);
            yield queryRunner.query(`DROP TYPE "public"."users_emailstatus_enum"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pendingEmail"`);
        });
    }
}
exports.AddEmailVerification1755779890370 = AddEmailVerification1755779890370;
//# sourceMappingURL=1755779890370-AddEmailVerification.js.map