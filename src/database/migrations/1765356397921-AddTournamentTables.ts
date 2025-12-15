import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTournamentTables1765356397921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."tournament_status_enum" AS ENUM('scheduled', 'live', 'calculating', 'ended')
        `);

    await queryRunner.query(`
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

    await queryRunner.query(`
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

    await queryRunner.query(`
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

    await queryRunner.query(`
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

    await queryRunner.query(`
            ALTER TABLE "tournament_reward_brackets"
            ADD CONSTRAINT "FK_reward_brackets_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);

    await queryRunner.query(`
            ALTER TABLE "tournament_results"
            ADD CONSTRAINT "FK_results_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);

    await queryRunner.query(`
            ALTER TABLE "tournament_participants"
            ADD CONSTRAINT "FK_participants_tournament"
            FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);

    await queryRunner.query(`
            ALTER TABLE "tournament_results"
            ADD CONSTRAINT "FK_results_user"
            FOREIGN KEY ("address") REFERENCES "users"("address") ON DELETE CASCADE
        `);

    await queryRunner.query(`
            ALTER TABLE "tournament_participants"
            ADD CONSTRAINT "FK_participants_user"
            FOREIGN KEY ("address") REFERENCES "users"("address") ON DELETE CASCADE
        `);

    await queryRunner.query(
      `ALTER TYPE "public"."user_xp_log_source" ADD VALUE IF NOT EXISTS 'TOURNAMENT'`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ADD COLUMN "tournamentId" uuid`,
    );

    await queryRunner.query(`
            ALTER TABLE "user_xp_log"
            ADD CONSTRAINT "FK_user_xp_log_tournament"
            FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE
        `);

    await queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_place_from"
          ON "tournament_reward_brackets" ("tournament_id", "place_from");
      `);
    await queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_place_to"
          ON "tournament_reward_brackets" ("tournament_id", "place_to");
      `);

    await queryRunner.query(`
          CREATE INDEX "idx_trb_tournament_results"
          ON "tournament_results" ("tournament_id", "address");
      `);
    await queryRunner.query(`
          CREATE INDEX "idx_tournament_results_final_place"
          ON "tournament_results" ("tournament_id", "final_place");
      `);
    await queryRunner.query(`
          CREATE INDEX "idx_tp_tournament_place"
          ON "tournament_participants" ("tournament_id", "place");
      `);
    await queryRunner.query(`
          CREATE INDEX "idx_tp_tournament_address"
          ON "tournament_participants" ("tournament_id", "address");
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_user_xp_log_tournament"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" DROP COLUMN "tournamentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_tournament"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_tournament"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_reward_brackets" DROP CONSTRAINT "FK_reward_brackets_tournament"`,
    );

    await queryRunner.query(`DROP INDEX "idx_trb_tournament_place_from"`);
    await queryRunner.query(`DROP INDEX "idx_trb_tournament_place_to"`);
    await queryRunner.query(`DROP INDEX "idx_trb_tournament_results"`);
    await queryRunner.query(`DROP INDEX "idx_tournament_results_final_place"`);
    await queryRunner.query(`DROP INDEX "idx_tp_tournament_place"`);
    await queryRunner.query(`DROP INDEX "idx_tp_tournament_address"`);

    await queryRunner.query(`DROP TABLE "tournament_participants"`);
    await queryRunner.query(`DROP TABLE "tournament_results"`);
    await queryRunner.query(`DROP TABLE "tournament_reward_brackets"`);
    await queryRunner.query(`DROP TABLE "tournaments"`);
    await queryRunner.query(`DROP TYPE "tournament_status_enum"`);
  }
}
