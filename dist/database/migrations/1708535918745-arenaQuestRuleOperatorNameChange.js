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
exports.ArenaQuestRuleOperatorNameChange1708535918745 = void 0;
class ArenaQuestRuleOperatorNameChange1708535918745 {
    constructor() {
        this.name = 'ArenaQuestRuleOperatorNameChange1708535918745';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd"`);
            yield queryRunner.query(`CREATE TABLE "arena_quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "count" numeric(78) NOT NULL, "prime" boolean NOT NULL DEFAULT false, "steps" jsonb NOT NULL DEFAULT '[]', "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0', "boost" numeric(78) NOT NULL DEFAULT '0', "boostLimit" numeric(78), "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5', CONSTRAINT "UQ_9584ee667d7a54a163e70ea6eb8" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_ccac340383b05000d610f79473" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_a1dba9cc4f41b4f7c00a0d05fe9" PRIMARY KEY ("seasonNumber", "id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_ccac340383b05000d610f79473f" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_ccac340383b05000d610f79473f"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`);
            yield queryRunner.query(`DROP TABLE "arena_quests"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena-quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaQuestRuleOperatorNameChange1708535918745 = ArenaQuestRuleOperatorNameChange1708535918745;
//# sourceMappingURL=1708535918745-arenaQuestRuleOperatorNameChange.js.map