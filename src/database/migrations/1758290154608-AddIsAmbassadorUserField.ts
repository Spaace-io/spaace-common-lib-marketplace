import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsAmbassadorUserField1758290154608
  implements MigrationInterface
{
  name = 'AddIsAmbassadorUserField1758290154608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isAmbassador" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAmbassador"`);
  }
}
