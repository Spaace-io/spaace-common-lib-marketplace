import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaChestNameAdded1710154238981 implements MigrationInterface {
  name = 'ArenaChestNameAdded1710154238981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" DROP CONSTRAINT "PK_1fc27ffcf9493669230428fb573"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ADD "name" "public"."arena_chest_name" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ADD CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" DROP CONSTRAINT "PK_1fc27ffcf9493669230428fb573"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" DROP COLUMN "name"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ADD "name" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ADD CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name")`,
    );
  }
}
