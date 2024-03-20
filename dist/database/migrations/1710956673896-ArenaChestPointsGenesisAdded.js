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
exports.ArenaChestPointsGenesisAdded1710956673896 = void 0;
class ArenaChestPointsGenesisAdded1710956673896 {
    constructor() {
        this.name = 'ArenaChestPointsGenesisAdded1710956673896';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_chest_points_genesis" ("chestNumber" numeric(78) NOT NULL DEFAULT '0', "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_b4b1e4de56973b0980992eba43d" PRIMARY KEY ("chestNumber"))`);
            yield queryRunner.query(`DROP TABLE IF EXISTS "arena_genesis_seasons_chest"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "arena_chest_points_genesis"`);
            yield queryRunner.query(`CREATE TABLE "arena_genesis_seasons_chest" (
              "level" numeric(78) NOT NULL DEFAULT '0',
              "stars" numeric(78) NOT NULL DEFAULT '0',
              "min" numeric(78) NOT NULL DEFAULT '0',
              "max" numeric(78) NOT NULL DEFAULT '0',
              CONSTRAINT "PK_0cb5d8862205cb4fa094616d080" PRIMARY KEY ("level")
            )`);
        });
    }
}
exports.ArenaChestPointsGenesisAdded1710956673896 = ArenaChestPointsGenesisAdded1710956673896;
//# sourceMappingURL=1710956673896-ArenaChestPointsGenesisAdded.js.map