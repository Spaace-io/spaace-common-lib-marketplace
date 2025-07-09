import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751018416142 implements MigrationInterface {
  name = 'Migrations1751018416142';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add featured field to collections
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD COLUMN "name" text`,
    );

    // Add featuredOrder field to collections
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD COLUMN "imageUrl" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the added columns in reverse order
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "imageUrl"`,
    );
  }
}
