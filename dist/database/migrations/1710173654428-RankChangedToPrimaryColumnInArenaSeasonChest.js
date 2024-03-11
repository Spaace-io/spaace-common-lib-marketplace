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
exports.RankChangedToPrimaryColumnInArenaSeasonChest1710173654428 = void 0;
class RankChangedToPrimaryColumnInArenaSeasonChest1710173654428 {
    constructor() {
        this.name = 'RankChangedToPrimaryColumnInArenaSeasonChest1710173654428';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_660d810ba4b5785318363c885e9" PRIMARY KEY ("seasonNumber", "divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ALTER COLUMN "rank" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ALTER COLUMN "rank" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "rank", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`);
        });
    }
}
exports.RankChangedToPrimaryColumnInArenaSeasonChest1710173654428 = RankChangedToPrimaryColumnInArenaSeasonChest1710173654428;
//# sourceMappingURL=1710173654428-RankChangedToPrimaryColumnInArenaSeasonChest.js.map