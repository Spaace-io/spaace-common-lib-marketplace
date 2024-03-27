import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaDivisionRelationAddedInProgress1711572374108
  implements MigrationInterface
{
  name = 'ArenaDivisionRelationAddedInProgress1711572374108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "division"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "division" "public"."arena_divison_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd" FOREIGN KEY ("seasonNumber", "division") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "division"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "division" text`,
    );
  }
}
