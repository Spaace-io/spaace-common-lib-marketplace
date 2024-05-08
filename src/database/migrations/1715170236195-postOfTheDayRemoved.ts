import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostOfTheDayRemoved1715170236195 implements MigrationInterface {
  name = 'PostOfTheDayRemoved1715170236195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7470b0c6f0e975f478662a660b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7470b0c6f0e975f478662a660b" ON "arena_spaace_tweet" ("postOfTheDay") `,
    );
  }
}
