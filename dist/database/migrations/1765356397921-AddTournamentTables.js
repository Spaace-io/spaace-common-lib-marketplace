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
exports.AddTournamentTables1765356397921 = void 0;
class AddTournamentTables1765356397921 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TYPE "public"."tournament_status_enum" AS ENUM('scheduled', 'live', 'calculating', 'ended')
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournaments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL UNIQUE,
                "description" text NOT NULL,
                "status" "tournament_status_enum" NOT NULL DEFAULT 'scheduled',
                "start_at" timestamp with time zone NOT NULL,
                "end_at" timestamp with time zone NOT NULL,
                "total_prize_xp" bigint NOT NULL DEFAULT '0',
                "created_at" timestamp with time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tournaments_id" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournament_reward_brackets" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tournament_id" uuid NOT NULL,
                "place_from" integer NOT NULL,
                "place_to" integer NOT NULL,
                "reward_xp" bigint NOT NULL,
                "score" numeric(78) NOT NULL,
                "created_at" timestamp with time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_reward_brackets_id" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournament_results" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tournament_id" uuid NOT NULL,
                "address" char(40) NOT NULL,
                "final_place" integer NOT NULL,
                "reward_xp" bigint NOT NULL,
                "count_purchases" integer NOT NULL,
                "score" numeric(78) NOT NULL,
                "created_at" timestamp with time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tournament_results_id" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournament_participants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tournament_id" uuid NOT NULL,
                "address" char(40) NOT NULL,
                "score" numeric(78) NOT NULL DEFAULT '0',
                "place" integer NOT NULL ,
                "count_purchases" integer NOT NULL,
                "created_at" timestamp with time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tournament_participants_id" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            ALTER TABLE "tournament_reward_brackets"
            ADD CONSTRAINT "FK_reward_brackets_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);
            yield queryRunner.query(`
            ALTER TABLE "tournament_results"
            ADD CONSTRAINT "FK_results_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);
            yield queryRunner.query(`
            ALTER TABLE "tournament_participants"
            ADD CONSTRAINT "FK_participants_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);
            yield queryRunner.query(`
            ALTER TABLE "tournament_results"
            ADD CONSTRAINT "FK_results_user"
            FOREIGN KEY ("address") REFERENCES "users"("address") ON DELETE CASCADE
        `);
            yield queryRunner.query(`
            ALTER TABLE "tournament_participants"
            ADD CONSTRAINT "FK_participants_user"
            FOREIGN KEY ("address") REFERENCES "users"("address") ON DELETE CASCADE
        `);
            yield queryRunner.query(`ALTER TYPE "public"."user_xp_log_source" ADD VALUE IF NOT EXISTS 'TOURNAMENT'`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" ADD COLUMN "tournamentId" uuid`);
            yield queryRunner.query(`
            ALTER TABLE "user_xp_log"
            ADD CONSTRAINT "FK_user_xp_log_tournament"
            FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);
            yield queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_place_from"
          ON "tournament_reward_brackets" ("tournament_id", "place_from");
      `);
            yield queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_place_to"
          ON "tournament_reward_brackets" ("tournament_id", "place_to");
      `);
            yield queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_results"
          ON "tournament_results" ("tournament_id", "address");
      `);
            yield queryRunner.query(`
          CREATE INDEX "idx_tournament_results_final_place"
          ON "tournament_results" ("tournament_id", "final_place");
      `);
            yield queryRunner.query(`
          CREATE INDEX "idx_tp_tournament_place"
          ON "tournament_participants" ("tournament_id", "place");
      `);
            yield queryRunner.query(`
          CREATE INDEX "idx_tp_tournament_address"
          ON "tournament_participants" ("tournament_id", "address");
      `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_user_xp_log_tournament"`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" DROP COLUMN "tournamentId"`);
            yield queryRunner.query(`ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_user"`);
            yield queryRunner.query(`ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_user"`);
            yield queryRunner.query(`ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_tournament"`);
            yield queryRunner.query(`ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_tournament"`);
            yield queryRunner.query(`ALTER TABLE "tournament_reward_brackets" DROP CONSTRAINT "FK_reward_brackets_tournament"`);
            yield queryRunner.query(`DROP INDEX "idx_trb_tournament_place_from"`);
            yield queryRunner.query(`DROP INDEX "idx_trb_tournament_place_to"`);
            yield queryRunner.query(`DROP INDEX "idx_trb_tournament_results"`);
            yield queryRunner.query(`DROP INDEX "idx_tournament_results_final_place"`);
            yield queryRunner.query(`DROP INDEX "idx_tp_tournament_place"`);
            yield queryRunner.query(`DROP INDEX "idx_tp_tournament_address"`);
            yield queryRunner.query(`DROP TABLE "tournament_participants"`);
            yield queryRunner.query(`DROP TABLE "tournament_results"`);
            yield queryRunner.query(`DROP TABLE "tournament_reward_brackets"`);
            yield queryRunner.query(`DROP TABLE "tournaments"`);
            yield queryRunner.query(`DROP TYPE "tournament_status_enum"`);
        });
    }
}
exports.AddTournamentTables1765356397921 = AddTournamentTables1765356397921;
//# sourceMappingURL=1765356397921-AddTournamentTables.js.map