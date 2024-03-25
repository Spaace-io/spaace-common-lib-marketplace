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
exports.ArenaCrewStarsTracking1711370149616 = void 0;
class ArenaCrewStarsTracking1711370149616 {
    constructor() {
        this.name = 'ArenaCrewStarsTracking1711370149616';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crew_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crewName" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9367de0f2d3e97beb1ed72cf296" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" ADD "twentyFourHourRank" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_stars_tracking" ADD CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_stars_tracking" DROP CONSTRAINT "FK_58bcd278e1f4b72e0393d8e0d55"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" DROP COLUMN "twentyFourHourRank"`);
            yield queryRunner.query(`DROP TABLE "arena_crew_stars_tracking"`);
        });
    }
}
exports.ArenaCrewStarsTracking1711370149616 = ArenaCrewStarsTracking1711370149616;
//# sourceMappingURL=1711370149616-ArenaCrewStarsTracking.js.map