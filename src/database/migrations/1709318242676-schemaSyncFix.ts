import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSyncFix1709318242676 implements MigrationInterface {
  name = 'SchemaSyncFix1709318242676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_10a4232b73f941c0df0ffe59676" FOREIGN KEY ("seasonNumber", "referenceQuestId") REFERENCES "arena_quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena-quests" DROP CONSTRAINT "FK_2d6403a1973bdf685cb0556d1e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena-quests" DROP CONSTRAINT "FK_a1d6fa5d44e47e98751677c7c47"`,
    );
    await queryRunner.query(`DROP TABLE "arena-quests"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_10a4232b73f941c0df0ffe59676"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena-quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "count" numeric(78) NOT NULL, "prime" boolean NOT NULL DEFAULT false, "steps" jsonb NOT NULL DEFAULT '[]', "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0', "boost" numeric(78) NOT NULL DEFAULT '0', "boostLimit" numeric(78), "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5', CONSTRAINT "UQ_8121786d0b0e266659764f970e8" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_2d6403a1973bdf685cb0556d1e" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_dd2f1d886295d0aa351120925de" PRIMARY KEY ("seasonNumber", "id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena-quests" ADD CONSTRAINT "FK_a1d6fa5d44e47e98751677c7c47" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena-quests" ADD CONSTRAINT "FK_2d6403a1973bdf685cb0556d1e5" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "arena-quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena-quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
