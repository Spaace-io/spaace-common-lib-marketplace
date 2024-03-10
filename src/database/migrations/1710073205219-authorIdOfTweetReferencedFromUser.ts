import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthorIdOfTweetReferencedFromUser1710073205219
  implements MigrationInterface
{
  name = 'AuthorIdOfTweetReferencedFromUser1710073205219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072" FOREIGN KEY ("authorId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" DROP CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072"`,
    );
  }
}
