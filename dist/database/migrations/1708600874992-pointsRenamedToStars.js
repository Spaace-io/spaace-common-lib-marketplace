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
exports.PointsRenamedToStars1708600874992 = void 0;
class PointsRenamedToStars1708600874992 {
    constructor() {
        this.name = 'PointsRenamedToStars1708600874992';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME COLUMN "points" TO "stars"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "loyaltyPoints" TO "stars"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "stars" TO "loyaltyPoints"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME COLUMN "stars" TO "points"`);
        });
    }
}
exports.PointsRenamedToStars1708600874992 = PointsRenamedToStars1708600874992;
//# sourceMappingURL=1708600874992-pointsRenamedToStars.js.map