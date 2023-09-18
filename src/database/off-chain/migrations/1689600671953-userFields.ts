import { MigrationInterface, QueryRunner } from 'typeorm';

export class userFields1689600671953 implements MigrationInterface {
  name = 'userFields1689600671953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "FK_8e507c23ab7f443020bd75a072c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_ac8319fc70ddd862d6476100b57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_3de617019fd4e649528fc62ec68" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_716a446b06578c914ef61ad1fd6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_716a446b06578c914ef61ad1fd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" DROP CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_3de617019fd4e649528fc62ec68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_ac8319fc70ddd862d6476100b57" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD CONSTRAINT "FK_8e507c23ab7f443020bd75a072c" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
