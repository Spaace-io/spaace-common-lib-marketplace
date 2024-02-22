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
exports.ArenaChestEntitiesFixes1708619259802 = void 0;
class ArenaChestEntitiesFixes1708619259802 {
    constructor() {
        this.name = 'ArenaChestEntitiesFixes1708619259802';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_genesis_seasons_chest" ("level" numeric(78) NOT NULL DEFAULT '0', "stars" numeric(78) NOT NULL DEFAULT '0', "min" numeric(78) NOT NULL DEFAULT '0', "max" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_7fd9ba24196be9aa6895b567ca9" PRIMARY KEY ("level"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "arena_genesis_seasons_chest"`);
        });
    }
}
exports.ArenaChestEntitiesFixes1708619259802 = ArenaChestEntitiesFixes1708619259802;
//# sourceMappingURL=1708619259802-arenaChestEntitiesFixes.js.map