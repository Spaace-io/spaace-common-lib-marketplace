import { MigrationInterface, QueryRunner } from 'typeorm';

export class totalSupply1673302113784 implements MigrationInterface {
  name = 'totalSupply1673302113784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "totalSupply"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "totalSupply" numeric(78,0)`,
    );
  }
}
