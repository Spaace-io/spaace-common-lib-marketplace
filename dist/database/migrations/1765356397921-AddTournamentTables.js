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
            CREATE TYPE "public"."tournament_status_enum" AS ENUM('draft', 'scheduled', 'live', 'calculating', 'ended')
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournaments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "description" text NOT NULL,
                "status" "tournament_status_enum" NOT NULL DEFAULT 'draft',
                "start_at" timestamp without time zone NOT NULL,
                "end_at" timestamp without time zone NOT NULL,
                "total_prize_xp" bigint NOT NULL DEFAULT '0',
                "created_at" timestamp without time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp without time zone NOT NULL DEFAULT now(),
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
                "created_at" timestamp without time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp without time zone NOT NULL DEFAULT now(),
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
                "created_at" timestamp without time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp without time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_tournament_results_id" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "tournament_participants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tournament_id" uuid NOT NULL,
                "address" char(40) NOT NULL,
                "score" numeric(78) NOT NULL DEFAULT '0',
                "place" integer,
                "count_purchases" integer NOT NULL,
                "created_at" timestamp without time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp without time zone NOT NULL DEFAULT now(),
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
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_tournament"`);
            yield queryRunner.query(`ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_tournament"`);
            yield queryRunner.query(`ALTER TABLE "tournament_reward_brackets" DROP CONSTRAINT "FK_reward_brackets_tournament"`);
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