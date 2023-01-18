import { MigrationInterface, QueryRunner } from 'typeorm';

export class transferTokenId1673289399859 implements MigrationInterface {
  name = 'transferTokenId1673289399859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME COLUMN "item" TO "tokenId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME CONSTRAINT "PK_391afc4e8fd540698f989c14d2b" TO "PK_1c74abed84080dd3c483724aa78"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME CONSTRAINT "PK_1c74abed84080dd3c483724aa78" TO "PK_391afc4e8fd540698f989c14d2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME COLUMN "tokenId" TO "item"`,
    );
  }
}
