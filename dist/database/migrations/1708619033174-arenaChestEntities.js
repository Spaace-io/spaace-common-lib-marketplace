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
exports.ArenaChestEntities1708619033174 = void 0;
class ArenaChestEntities1708619033174 {
    constructor() {
        this.name = 'ArenaChestEntities1708619033174';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`);
            yield queryRunner.query(`CREATE TABLE "arena_chest_points" ("name" text NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_1fc27ffcf9493669230428fb573" PRIMARY KEY ("name"))`);
            yield queryRunner.query(`CREATE TABLE "arena_seasons_chest" ("seasonNumber" numeric(78) NOT NULL, "division" text, "rank" text, "chestCount" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber"))`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons" ADD "rewardCoefiecient" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_738ad7df4a6908002d9789bcf14" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_738ad7df4a6908002d9789bcf14"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP CONSTRAINT "FK_581b5643298f37eb2dc095d0d94"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons" DROP COLUMN "rewardCoefiecient"`);
            yield queryRunner.query(`DROP TABLE "arena_seasons_chest"`);
            yield queryRunner.query(`DROP TABLE "arena_chest_points"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD CONSTRAINT "FK_581b5643298f37eb2dc095d0d94" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaChestEntities1708619033174 = ArenaChestEntities1708619033174;
//# sourceMappingURL=1708619033174-arenaChestEntities.js.map