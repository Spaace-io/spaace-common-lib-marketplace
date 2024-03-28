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
exports.CrewQuestProgressAdded1711630789063 = void 0;
class CrewQuestProgressAdded1711630789063 {
    constructor() {
        this.name = 'CrewQuestProgressAdded1711630789063';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crew_quest_progress" ("crewName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_179dc7274f205b891814dc784d2" PRIMARY KEY ("crewName", "seasonNumber", "questId", "nonce"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_7fee30aff1fe8f6877383958a4" ON "arena_crew_quest_progress" ("crewName", "seasonNumber", "questId") WHERE "completed"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_b662357f295888d181665193e68" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" ADD CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_fe42e6e6b5b8dc4358f63600478"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_b662357f295888d181665193e68"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_quest_progress" DROP CONSTRAINT "FK_ac59388a0fc24654d00aeeeb03e"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7fee30aff1fe8f6877383958a4"`);
            yield queryRunner.query(`DROP TABLE "arena_crew_quest_progress"`);
        });
    }
}
exports.CrewQuestProgressAdded1711630789063 = CrewQuestProgressAdded1711630789063;
//# sourceMappingURL=1711630789063-crewQuestProgressAdded.js.map