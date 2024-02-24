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
exports.ArenaSchemaFixPhase21708788228086 = void 0;
class ArenaSchemaFixPhase21708788228086 {
    constructor() {
        this.name = 'ArenaSchemaFixPhase21708788228086';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" RENAME COLUMN "division" TO "divisionName"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "prime"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "boost"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "boostLimit"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_738ad7df4a6908002d9789bcf14"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba" PRIMARY KEY ("seasonNumber", "divisionName")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ALTER COLUMN "divisionName" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "UQ_660d810ba4b5785318363c885e9" UNIQUE ("seasonNumber", "divisionName", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba" FOREIGN KEY ("seasonNumber", "divisionName") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "FK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "UQ_660d810ba4b5785318363c885e9"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ALTER COLUMN "divisionName" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" DROP CONSTRAINT "PK_35b03f988c70196baa8c6d7a2ba"`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" ADD CONSTRAINT "PK_738ad7df4a6908002d9789bcf14" PRIMARY KEY ("seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "boostLimit" numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "boost" numeric(78,0) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "prime" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest" RENAME COLUMN "divisionName" TO "division"`);
        });
    }
}
exports.ArenaSchemaFixPhase21708788228086 = ArenaSchemaFixPhase21708788228086;
//# sourceMappingURL=1708788228086-arenaSchemaFixPhase2.js.map