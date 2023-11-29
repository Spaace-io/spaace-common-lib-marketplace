import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollectionLike1701258253453 implements MigrationInterface {
  name = 'CollectionLike1701258253453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_e41c99bbacddaba54b87818120b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reports" DROP CONSTRAINT "FK_790df43caeb355875eb032acfad"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" ADD CONSTRAINT "FK_790df43caeb355875eb032acfad" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_e41c99bbacddaba54b87818120b" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
