import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimestampFieldsAdded1709111532933 implements MigrationInterface {
  name = 'TimestampFieldsAdded1709111532933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "accountCreationDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterAccountCreationDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterAccountCreationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "accountCreationDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
