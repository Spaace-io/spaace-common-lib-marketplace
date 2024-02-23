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
exports.ArenaLeaderboard1708690226066 = void 0;
class ArenaLeaderboard1708690226066 {
    constructor() {
        this.name = 'ArenaLeaderboard1708690226066';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_global_leaderboard" ("userTwitter" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_f4169a5bd90ab63ba0a9f3f6d48" PRIMARY KEY ("userTwitter"))`);
            yield queryRunner.query(`CREATE TABLE "arena_crew_leaderboard" ("crewName" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_68d58841f613bb3363032f3e985" PRIMARY KEY ("crewName"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "xp" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "division" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "league" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_ed874545e9614cca8017aa84789"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_4297509692a34927505cf4a86a9" PRIMARY KEY ("divisionName", "seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_4297509692a34927505cf4a86a9"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_ed874545e9614cca8017aa84789" PRIMARY KEY ("divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "league"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "division"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "xp"`);
            yield queryRunner.query(`DROP TABLE "arena_crew_leaderboard"`);
            yield queryRunner.query(`DROP TABLE "arena_global_leaderboard"`);
        });
    }
}
exports.ArenaLeaderboard1708690226066 = ArenaLeaderboard1708690226066;
//# sourceMappingURL=1708690226066-arenaLeaderboard.js.map