import { MigrationInterface, QueryRunner } from 'typeorm';

export class LikeReportNullable1694608389206 implements MigrationInterface {
  name = 'LikeReportNullable1694608389206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_dd8b4ee8d658dbbc0a9360f28b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_66592117509d55235181645b336"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_3a9c67133f5aa9043af06394c91" PRIMARY KEY ("collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_3a9c67133f5aa9043af06394c91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a" PRIMARY KEY ("tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_94709cf71c27ccf90268b815a23" PRIMARY KEY ("collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_94709cf71c27ccf90268b815a23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0" PRIMARY KEY ("tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "UQ_66592117509d55235181645b336"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_d9013193989303580053c0b5ef6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0" PRIMARY KEY ("tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_94709cf71c27ccf90268b815a23" PRIMARY KEY ("collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_94709cf71c27ccf90268b815a23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_a9323de3f8bced7539a794b4a37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a" PRIMARY KEY ("tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_3a9c67133f5aa9043af06394c91" PRIMARY KEY ("collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_3a9c67133f5aa9043af06394c91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "PK_66592117509d55235181645b336" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "PK_dd8b4ee8d658dbbc0a9360f28b9" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId")`,
    );
    await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "id"`);
  }
}
