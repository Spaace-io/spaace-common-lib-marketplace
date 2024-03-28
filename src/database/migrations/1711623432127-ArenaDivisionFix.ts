import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaDivisionFix1711623432127 implements MigrationInterface {
  name = 'ArenaDivisionFix1711623432127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd" FOREIGN KEY ("seasonNumber", "division") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
