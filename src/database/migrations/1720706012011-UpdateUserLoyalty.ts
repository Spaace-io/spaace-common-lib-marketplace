import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserLoyalty1720706012011 implements MigrationInterface {
  name = 'UpdateUserLoyalty1720706012011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD "rank" "public"."rank" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "PK_5254410832e753bed54603862d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "PK_18188fc290d83e7bed6d21e16e8" PRIMARY KEY ("seasonNumber", "userAddress", "rank")`,
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
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "PK_18188fc290d83e7bed6d21e16e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("seasonNumber", "userAddress")`,
    );
    await queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "rank"`);
  }
}
