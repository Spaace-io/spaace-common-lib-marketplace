import { MigrationInterface, QueryRunner } from 'typeorm';

export class userProfile1691062696891 implements MigrationInterface {
  name = 'userProfile1691062696891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "name" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "biography" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "imageUrl" text`);
    await queryRunner.query(`ALTER TABLE "users" ADD "bannerUrl" text`);
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ALTER COLUMN "currentStep" TYPE numeric(78,0)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bannerUrl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imageUrl"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "biography"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
