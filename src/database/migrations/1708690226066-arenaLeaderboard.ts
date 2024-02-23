import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaLeaderboard1708690226066 implements MigrationInterface {
  name = 'ArenaLeaderboard1708690226066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_global_leaderboard" ("userTwitter" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_f4169a5bd90ab63ba0a9f3f6d48" PRIMARY KEY ("userTwitter"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_crew_leaderboard" ("crewName" text NOT NULL, "position" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_68d58841f613bb3363032f3e985" PRIMARY KEY ("crewName"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "xp" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "division" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "league" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_ed874545e9614cca8017aa84789"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_4297509692a34927505cf4a86a9" PRIMARY KEY ("divisionName", "seasonNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_4297509692a34927505cf4a86a9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_ed874545e9614cca8017aa84789" PRIMARY KEY ("divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "league"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "division"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "xp"`,
    );
    await queryRunner.query(`DROP TABLE "arena_crew_leaderboard"`);
    await queryRunner.query(`DROP TABLE "arena_global_leaderboard"`);
  }
}
