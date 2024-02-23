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
exports.ArenaLeaderboard1708692739545 = void 0;
class ArenaLeaderboard1708692739545 {
    constructor() {
        this.name = 'ArenaLeaderboard1708692739545';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_global_leaderboard" ("userTwitter" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_f4169a5bd90ab63ba0a9f3f6d48" PRIMARY KEY ("userTwitter"))`);
            yield queryRunner.query(`CREATE TABLE "arena_crew_leaderboard" ("crewName" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_68d58841f613bb3363032f3e985" PRIMARY KEY ("crewName"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "xp" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "division" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "league" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "league"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "division"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "xp"`);
            yield queryRunner.query(`DROP TABLE "arena_crew_leaderboard"`);
            yield queryRunner.query(`DROP TABLE "arena_global_leaderboard"`);
        });
    }
}
exports.ArenaLeaderboard1708692739545 = ArenaLeaderboard1708692739545;
//# sourceMappingURL=1708692739545-arenaLeaderboard.js.map