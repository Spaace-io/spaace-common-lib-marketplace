import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreationDateAddedInArenaCrew1711113214958
  implements MigrationInterface
{
  name = 'CreationDateAddedInArenaCrew1711113214958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crews" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crews" DROP COLUMN "creationDate"`,
    );
  }
}
