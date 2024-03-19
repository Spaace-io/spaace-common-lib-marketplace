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
exports.ChestProbabilityRemovedFromChestProgress1710847626296 = void 0;
class ChestProbabilityRemovedFromChestProgress1710847626296 {
    constructor() {
        this.name = 'ChestProbabilityRemovedFromChestProgress1710847626296';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_fb3198c7f96b2926505e469be15"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" DROP COLUMN "chestProbability"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD "chestProbability" uuid NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_fb3198c7f96b2926505e469be15" FOREIGN KEY ("chestProbability") REFERENCES "arena_chest_probability_genesis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ChestProbabilityRemovedFromChestProgress1710847626296 = ChestProbabilityRemovedFromChestProgress1710847626296;
//# sourceMappingURL=1710847626296-chestProbabilityRemovedFromChestProgress.js.map