import { MigrationInterface, QueryRunner } from 'typeorm';

export class TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579
  implements MigrationInterface
{
  name =
    'TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "totalReferrals" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_8186abb732ca235605d0271904e" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_8186abb732ca235605d0271904e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b" PRIMARY KEY ("seasonNumber", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ALTER COLUMN "seasonNumber" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_d2d5c36f6503c8772dc1b8d05bc" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_d2d5c36f6503c8772dc1b8d05bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b" PRIMARY KEY ("seasonNumber", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_8186abb732ca235605d0271904e" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_8186abb732ca235605d0271904e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c" PRIMARY KEY ("seasonNumber", "userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "totalReferrals"`,
    );
  }
}
