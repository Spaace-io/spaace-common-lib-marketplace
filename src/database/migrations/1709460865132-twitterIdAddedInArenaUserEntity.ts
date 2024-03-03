import { MigrationInterface, QueryRunner } from 'typeorm';

export class TwitterIdAddedInArenaUserEntity1709460865132
  implements MigrationInterface
{
  name = 'TwitterIdAddedInArenaUserEntity1709460865132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "userTwitterId" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_e830721892799dc0da5013bbc0d" UNIQUE ("userTwitterId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_e830721892799dc0da5013bbc0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "userTwitterId"`,
    );
  }
}
