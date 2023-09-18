import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateConstraints1671139061340 implements MigrationInterface {
  name = 'updateConstraints1671139061340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ADD "primaryId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a" UNIQUE ("primaryId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "tokenId"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "tokenId" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "latest_block" ADD CONSTRAINT "CHK_a6e4d39162b05136d98f963774" CHECK (pk = TRUE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "latest_block" DROP CONSTRAINT "CHK_a6e4d39162b05136d98f963774"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "tokenId"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "tokenId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "primaryId"`);
  }
}
