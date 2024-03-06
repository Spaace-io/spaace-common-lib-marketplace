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
exports.ArenaDivisionNameEnumAdded1709730158959 = void 0;
class ArenaDivisionNameEnumAdded1709730158959 {
    constructor() {
        this.name = 'ArenaDivisionNameEnumAdded1709730158959';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa" PRIMARY KEY ("seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_divison_name" AS ENUM('DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE')`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "name" "public"."arena_divison_name" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_94d80081d208b958b72225cf10f" PRIMARY KEY ("seasonNumber", "leagueNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "divisionName" "public"."arena_divison_name" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_94d80081d208b958b72225cf10f"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "leagueNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD "divisionName" "public"."arena_divison_name" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_2b809055e077f791ee283e30885"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD "divisionName" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_94d80081d208b958b72225cf10f" PRIMARY KEY ("seasonNumber", "leagueNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP COLUMN "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD "divisionName" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "PK_94d80081d208b958b72225cf10f"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "PK_ba0dde4bf4aaa668dddac2f0b3c" PRIMARY KEY ("seasonNumber", "leagueNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_25764ae558b24214f37af1d98a1"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa" PRIMARY KEY ("seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP COLUMN "name"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_divison_name"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD "name" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "PK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "PK_25764ae558b24214f37af1d98a1" PRIMARY KEY ("seasonNumber", "name")`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_2b809055e077f791ee283e30885" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaDivisionNameEnumAdded1709730158959 = ArenaDivisionNameEnumAdded1709730158959;
//# sourceMappingURL=1709730158959-ArenaDivisionNameEnumAdded.js.map