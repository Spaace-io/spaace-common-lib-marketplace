import { MigrationInterface, QueryRunner } from 'typeorm';

export class userLoyalty1691747087886 implements MigrationInterface {
  name = 'userLoyalty1691747087886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_loyalties" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "points" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("userAddress", "seasonNumber"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "loyaltyRewardsClaimed"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewards"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyPoints"`);
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyPoints" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyRewards" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyRewardsClaimed" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`DROP TABLE "user_loyalties"`);
  }
}
