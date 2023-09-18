import { MigrationInterface, QueryRunner } from 'typeorm';

export class collectionLinks1678363631869 implements MigrationInterface {
  name = 'collectionLinks1678363631869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "links" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "links"`);
  }
}
