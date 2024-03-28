import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaUserStartTrackingAdded1711625915904
  implements MigrationInterface
{
  name = 'ArenaUserStartTrackingAdded1711625915904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_user_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitter" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bbafe775a9c17fc0288642d410f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ADD CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" DROP CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828"`,
    );
    await queryRunner.query(`DROP TABLE "arena_user_stars_tracking"`);
  }
}
