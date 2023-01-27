import { MigrationInterface, QueryRunner } from 'typeorm';

export class resetAttributes1674834418072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "collections" SET "attributes" = NULL`);
  }

  public async down(): Promise<void> {}
}
