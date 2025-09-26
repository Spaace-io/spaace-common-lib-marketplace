import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNftScoreField1758290154609 implements MigrationInterface {
  name = 'AddNftScoreField1758290154609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD "nftScore" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP COLUMN "nftScore"`,
    );
  }
}
