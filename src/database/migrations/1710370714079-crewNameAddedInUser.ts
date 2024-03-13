import { MigrationInterface, QueryRunner } from 'typeorm';

export class CrewNameAddedInUser1710370714079 implements MigrationInterface {
  name = 'CrewNameAddedInUser1710370714079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_users" ADD "crewName" text`);
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "FK_0cece92ebcf29a89687133a476a" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "FK_0cece92ebcf29a89687133a476a"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "crewName"`);
  }
}
