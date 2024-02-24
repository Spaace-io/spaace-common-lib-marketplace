"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaSchemaFixPhase11708784745452 = void 0;
class ArenaSchemaFixPhase11708784745452 {
    constructor() {
        this.name = 'ArenaSchemaFixPhase11708784745452';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "leagueUsersMaxCap"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_ed874545e9614cca8017aa84789"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "divisionNumber"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "name" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef" PRIMARY KEY ("name")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "leagueUserMaxCap" numeric NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "divisionName" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_38abc11e26dcaddbe8c3eff3654"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1" PRIMARY KEY ("leagueNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "divisionName", "leagueNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ALTER COLUMN "seasonNumber" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_2b809055e077f791ee283e30885" PRIMARY KEY ("seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "leagueNumber"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "leagueNumber" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_2b809055e077f791ee283e30885"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "divisionName", "leagueNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "numberOfUsers"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "numberOfUsers" numeric NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "numberOfUsers"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "numberOfUsers" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_2b809055e077f791ee283e30885" PRIMARY KEY ("seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "leagueNumber"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "leagueNumber" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_2b809055e077f791ee283e30885"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("leagueNumber", "seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ALTER COLUMN "seasonNumber" TYPE numeric`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1" PRIMARY KEY ("leagueNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef" PRIMARY KEY ("name")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_e9662b6c50317de795ca9e1caf1"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_38abc11e26dcaddbe8c3eff3654" PRIMARY KEY ("leagueNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "leagueUserMaxCap"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_e0bf3f9d55c6c4a2dd22b97e8ef"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "divisionNumber" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "divisionName" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_ed874545e9614cca8017aa84789" PRIMARY KEY ("divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "leagueUsersMaxCap" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17" FOREIGN KEY ("divisionNumber") REFERENCES "arena_divisions"("divisionName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaSchemaFixPhase11708784745452 = ArenaSchemaFixPhase11708784745452;
//# sourceMappingURL=1708784745452-arenaSchemaFixPhase1.js.map