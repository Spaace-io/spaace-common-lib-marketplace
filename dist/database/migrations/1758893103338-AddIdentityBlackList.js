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
exports.AddIdentityBlackList1758893103338 = void 0;
class AddIdentityBlackList1758893103338 {
    constructor() {
        this.name = 'AddIdentityBlackList1758893103338';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."identifier_type_enum" AS ENUM('wallet', 'email', 'discord', 'twitter')`);
            yield queryRunner.query(`CREATE TABLE "identity_blacklist" ("id" BIGSERIAL NOT NULL, "identifierType" "public"."identifier_type_enum" NOT NULL, "identifierValue" text NOT NULL, "reason" text, "createdBy" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "uq_ibl_type_value" UNIQUE ("identifierType", "identifierValue"), CONSTRAINT "PK_ee75cf4f44901c345b94fdf2d0e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "idx_ibl_type_value" ON "identity_blacklist" ("identifierType", "identifierValue") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."idx_ibl_type_value"`);
            yield queryRunner.query(`DROP TABLE "identity_blacklist"`);
            yield queryRunner.query(`DROP TYPE "public"."identifier_type_enum"`);
        });
    }
}
exports.AddIdentityBlackList1758893103338 = AddIdentityBlackList1758893103338;
//# sourceMappingURL=1758893103338-AddIdentityBlackList.js.map