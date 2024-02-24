import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaSchemaFixPhase11708784745452 implements MigrationInterface {
  name = 'ArenaSchemaFixPhase11708784745452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP COLUMN "leagueUsersMaxCap"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_ed874545e9614cca8017aa84789"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "divisionNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "name" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef" PRIMARY KEY ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "leagueUserMaxCap" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "divisionName" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_38abc11e26dcaddbe8c3eff3654"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1" PRIMARY KEY ("leagueNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "divisionName", "leagueNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ALTER COLUMN "seasonNumber" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_2b809055e077f791ee283e30885" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "leagueNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "leagueNumber" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "divisionName", "leagueNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "numberOfUsers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "numberOfUsers" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "numberOfUsers"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "numberOfUsers" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_2b809055e077f791ee283e30885" PRIMARY KEY ("seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "leagueNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "leagueNumber" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_2b809055e077f791ee283e30885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("leagueNumber", "seasonNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ALTER COLUMN "seasonNumber" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1" PRIMARY KEY ("leagueNumber", "divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef" PRIMARY KEY ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_38abc11e26dcaddbe8c3eff3654" PRIMARY KEY ("leagueNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP COLUMN "leagueUserMaxCap"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD "divisionNumber" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "divisionName" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_ed874545e9614cca8017aa84789" PRIMARY KEY ("divisionName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_divisions" ADD "leagueUsersMaxCap" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17" FOREIGN KEY ("divisionNumber") REFERENCES "arena_divisions"("divisionName") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
