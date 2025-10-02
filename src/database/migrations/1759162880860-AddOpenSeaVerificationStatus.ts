import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOpenSeaVerificationStatus1759162880860
  implements MigrationInterface
{
  name = 'AddOpenSeaVerificationStatus1759162880860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "openseaVerificationStatus" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "openseaVerifiedCheckedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "openseaVerifiedCheckedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "openseaVerificationStatus"`,
    );
  }
}
