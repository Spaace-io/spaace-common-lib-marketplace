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
exports.SeasonNumberRemovedFromArenaSeasonChest1714576906653 = void 0;
class SeasonNumberRemovedFromArenaSeasonChest1714576906653 {
    constructor() {
        this.name = 'SeasonNumberRemovedFromArenaSeasonChest1714576906653';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_738ad7df4a6908002d9789bcf14"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_de046ac583e8be33d3b9f42f4a1" PRIMARY KEY ("divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP COLUMN "seasonNumber"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD "seasonNumber" numeric(78,0) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_de046ac583e8be33d3b9f42f4a1"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_660d810ba4b5785318363c885e9" PRIMARY KEY ("seasonNumber", "divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "rank", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_738ad7df4a6908002d9789bcf14" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.SeasonNumberRemovedFromArenaSeasonChest1714576906653 = SeasonNumberRemovedFromArenaSeasonChest1714576906653;
//# sourceMappingURL=1714576906653-SeasonNumberRemovedFromArenaSeasonChest.js.map