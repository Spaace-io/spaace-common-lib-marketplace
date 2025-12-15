import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1765785632300 implements MigrationInterface {
  name = 'Migrations1765785632300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the existing primary key constraint
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP CONSTRAINT "PK_69981a9c4683414ece3931e518a"`,
    );

    // Add the tokenIdRange column as nullable
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "tokenIdRange" numrange`,
    );

    // Add id column as new primary key
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "id" SERIAL PRIMARY KEY`,
    );

    // Add unique constraint on collectionAddress and tokenIdRange
    // NULL values are treated as distinct in PostgreSQL unique constraints
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_prime_collections_address_range" ON "prime_collections" ("collectionAddress", "tokenIdRange")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique index
    await queryRunner.query(`DROP INDEX "UQ_prime_collections_address_range"`);

    // Drop the id column
    await queryRunner.query(`ALTER TABLE "prime_collections" DROP COLUMN "id"`);

    // Drop the tokenIdRange column
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "tokenIdRange"`,
    );

    // Restore the original primary key on collectionAddress only
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD CONSTRAINT "PK_69981a9c4683414ece3931e518a" PRIMARY KEY ("collectionAddress")`,
    );
  }
}
