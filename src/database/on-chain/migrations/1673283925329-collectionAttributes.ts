import { MigrationInterface, QueryRunner } from 'typeorm';

export class collectionAttributes1673283925329 implements MigrationInterface {
  name = 'collectionAttributes1673283925329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "abi"`);
    await queryRunner.query(`ALTER TABLE "collections" ADD "attributes" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "attributes"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" ADD "abi" jsonb`);
  }
}
