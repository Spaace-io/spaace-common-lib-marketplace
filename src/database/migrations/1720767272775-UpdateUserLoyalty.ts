import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserLoyalty1720767272775 implements MigrationInterface {
  name = 'UpdateUserLoyalty1720767272775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD "rank" "public"."rank" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "rank"`);
  }
}
