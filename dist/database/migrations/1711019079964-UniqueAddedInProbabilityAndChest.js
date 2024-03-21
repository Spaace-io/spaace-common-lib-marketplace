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
exports.UniqueAddedInProbabilityAndChest1711019079964 = void 0;
class UniqueAddedInProbabilityAndChest1711019079964 {
    constructor() {
        this.name = 'UniqueAddedInProbabilityAndChest1711019079964';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_chest_probability_genesis" ADD CONSTRAINT "UQ_db9b9e54d34f47b491352104fad" UNIQUE ("minLevel", "maxLevel")`);
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest_genesis" ADD CONSTRAINT "UQ_1d090c2699ae2d964ef51b878c7" UNIQUE ("minChestCount", "maxChestCount")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_seasons_chest_genesis" DROP CONSTRAINT "UQ_1d090c2699ae2d964ef51b878c7"`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_probability_genesis" DROP CONSTRAINT "UQ_db9b9e54d34f47b491352104fad"`);
        });
    }
}
exports.UniqueAddedInProbabilityAndChest1711019079964 = UniqueAddedInProbabilityAndChest1711019079964;
//# sourceMappingURL=1711019079964-UniqueAddedInProbabilityAndChest.js.map