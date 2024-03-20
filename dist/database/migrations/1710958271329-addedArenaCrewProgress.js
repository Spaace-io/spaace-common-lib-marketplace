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
exports.AddedArenaCrewProgress1710958271329 = void 0;
class AddedArenaCrewProgress1710958271329 {
    constructor() {
        this.name = 'AddedArenaCrewProgress1710958271329';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crew_progress" ("crewName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_7d564ee5d1ab3a80bebee9368ef" PRIMARY KEY ("crewName", "seasonNumber"))`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" ADD CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_2016c331f10d8c6d7f32125ab31"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" DROP CONSTRAINT "FK_e210c66dc623cca1065d6c98eb4"`);
            yield queryRunner.query(`DROP TABLE "arena_crew_progress"`);
        });
    }
}
exports.AddedArenaCrewProgress1710958271329 = AddedArenaCrewProgress1710958271329;
//# sourceMappingURL=1710958271329-addedArenaCrewProgress.js.map