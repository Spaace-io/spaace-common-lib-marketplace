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
exports.AddModerationAudit1758893373320 = void 0;
class AddModerationAudit1758893373320 {
    constructor() {
        this.name = 'AddModerationAudit1758893373320';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."moderation_action_enum" AS ENUM('BULK_SET_STATUS', 'MANUAL_SET_STATUS', 'ADD_BLACKLIST_ID', 'REMOVE_BLACKLIST_ID')`);
            yield queryRunner.query(`CREATE TABLE "moderation_audit" ("id" BIGSERIAL NOT NULL, "action" "public"."moderation_action_enum" NOT NULL, "wallet" text, "details" jsonb, "actedBy" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_702d6f65bea017b1d458e54a3c9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "idx_mod_audit_action" ON "moderation_audit" ("action", "created_at") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."idx_mod_audit_action"`);
            yield queryRunner.query(`DROP TABLE "moderation_audit"`);
            yield queryRunner.query(`DROP TYPE "public"."moderation_action_enum"`);
        });
    }
}
exports.AddModerationAudit1758893373320 = AddModerationAudit1758893373320;
//# sourceMappingURL=1758893373320-AddModerationAudit.js.map