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
exports.AddUserStatus1758892846542 = void 0;
class AddUserStatus1758892846542 {
    constructor() {
        this.name = 'AddUserStatus1758892846542';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'REVIEW', 'BLACKLIST', 'DELETED')`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "abuseScore" integer`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "abuseReason" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "statusUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()`);
            yield queryRunner.query(`CREATE INDEX "idx_users_status" ON "users" ("status") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."idx_users_status"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "statusUpdatedAt"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "abuseReason"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "abuseScore"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        });
    }
}
exports.AddUserStatus1758892846542 = AddUserStatus1758892846542;
//# sourceMappingURL=1758892846542-AddUserStatus.js.map