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
exports.ArenaUserLevelEntityAdded1714996949319 = void 0;
class ArenaUserLevelEntityAdded1714996949319 {
    constructor() {
        this.name = 'ArenaUserLevelEntityAdded1714996949319';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_user_level_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitterId" text NOT NULL, "oldLevel" numeric(78) NOT NULL DEFAULT '0', "newLevel" numeric(78) NOT NULL DEFAULT '0', "inProcess" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ef22192eaa701e56f7386d32310" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_level_event" ADD CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_level_event" DROP CONSTRAINT "FK_4c5306e43cdc2fc79472f1c6fee"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP TABLE "arena_user_level_event"`);
        });
    }
}
exports.ArenaUserLevelEntityAdded1714996949319 = ArenaUserLevelEntityAdded1714996949319;
//# sourceMappingURL=1714996949319-arenaUserLevelEntityAdded.js.map