import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixTransferPK1670960552946 implements MigrationInterface {
  name = 'fixTransferPK1670960552946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" DROP CONSTRAINT "PK_dbae301f250e9d4435104066841"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD CONSTRAINT "PK_8014320111bae3fc011967a73de" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "item")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfers" DROP CONSTRAINT "PK_8014320111bae3fc011967a73de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD CONSTRAINT "PK_dbae301f250e9d4435104066841" PRIMARY KEY ("txHash", "logIdx")`,
    );
  }
}
