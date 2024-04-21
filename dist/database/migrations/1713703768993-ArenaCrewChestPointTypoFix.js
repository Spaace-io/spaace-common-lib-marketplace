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
exports.ArenaCrewChestPointTypoFix1713703768993 = void 0;
class ArenaCrewChestPointTypoFix1713703768993 {
    constructor() {
        this.name = 'ArenaCrewChestPointTypoFix1713703768993';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crew_chest_points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "minRank" numeric(78) NOT NULL DEFAULT '0', "maxRank" numeric(78) NOT NULL DEFAULT '0', "tiers" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "UQ_d8279cff4cd34c04adcd6bf9ef7" UNIQUE ("minRank", "maxRank"), CONSTRAINT "PK_4ee6b76059733e2ce25ab2ac830" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP TABLE "arena_crew_chest_points"`);
        });
    }
}
exports.ArenaCrewChestPointTypoFix1713703768993 = ArenaCrewChestPointTypoFix1713703768993;
//# sourceMappingURL=1713703768993-ArenaCrewChestPointTypoFix.js.map