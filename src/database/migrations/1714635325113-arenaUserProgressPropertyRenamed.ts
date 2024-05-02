import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaUserProgressPropertyRenamed1714635325113
  implements MigrationInterface
{
  name = 'ArenaUserProgressPropertyRenamed1714635325113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_20c10956cb163d953e1481757fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME CONSTRAINT "PK_8401b8efb920856c9907965ee07" TO "PK_6450bfdfc1d35a6cef49994c0dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME CONSTRAINT "PK_6450bfdfc1d35a6cef49994c0dd" TO "PK_8401b8efb920856c9907965ee07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_20c10956cb163d953e1481757fa" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
