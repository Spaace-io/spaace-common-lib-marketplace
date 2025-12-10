import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTournamentTables1765356397921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."tournament_status_enum" AS ENUM('draft', 'scheduled', 'live', 'calculating', 'ended')
        `);

    await queryRunner.query(`
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

    await queryRunner.query(`
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

    await queryRunner.query(`
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

    await queryRunner.query(`
            CREATE TABLE "tournament_participants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tournament_id" uuid NOT NULL,
                "address" char NOT NULL,
                "score" bigint NOT NULL DEFAULT '0',
                "place" integer,
                "count_purchases" integer NOT NULL,
                "created_at" timestamp without time zone NOT NULL DEFAULT now(),
                "updated_at" timestamp without time zone NOT NULL DEFAULT now(),
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_participants" DROP CONSTRAINT "FK_participants_tournament"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_results" DROP CONSTRAINT "FK_results_tournament"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_reward_brackets" DROP CONSTRAINT "FK_reward_brackets_tournament"`,
    );

    await queryRunner.query(`DROP TABLE "tournament_participants"`);
    await queryRunner.query(`DROP TABLE "tournament_results"`);
    await queryRunner.query(`DROP TABLE "tournament_reward_brackets"`);
    await queryRunner.query(`DROP TABLE "tournaments"`);
    await queryRunner.query(`DROP TYPE "tournament_status_enum"`);
  }
}
