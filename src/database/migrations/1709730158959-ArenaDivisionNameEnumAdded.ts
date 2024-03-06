import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaDivisionNameEnumAdded1709730158959
  implements MigrationInterface
{
  name = 'ArenaDivisionNameEnumAdded1709730158959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa" PRIMARY KEY ("seasonNumber")`,
    );
    await queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
    await queryRunner.query(
      `CREATE TYPE "public"."arena_divison_name" AS ENUM('DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "name" "public"."arena_divison_name" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_94d80081d208b958b72225cf10f" PRIMARY KEY ("seasonNumber", "leagueNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "divisionName" "public"."arena_divison_name" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_94d80081d208b958b72225cf10f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "leagueNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD "divisionName" "public"."arena_divison_name" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD "divisionName" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_94d80081d208b958b72225cf10f" PRIMARY KEY ("seasonNumber", "leagueNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "divisionName" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_94d80081d208b958b72225cf10f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "leagueNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa" PRIMARY KEY ("seasonNumber")`,
    );
    await queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "public"."arena_divison_name"`);
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "name" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
