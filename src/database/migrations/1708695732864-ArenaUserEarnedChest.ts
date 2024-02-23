import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaUserEarnedChest1708695732864 implements MigrationInterface {
  name = 'ArenaUserEarnedChest1708695732864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_users_earned_chest" ("userTwitter" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', "chestName" text NOT NULL, "isClaimed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c" PRIMARY KEY ("userTwitter", "seasonNumber"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`,
    );
    await queryRunner.query(`DROP TABLE "arena_users_earned_chest"`);
  }
}
