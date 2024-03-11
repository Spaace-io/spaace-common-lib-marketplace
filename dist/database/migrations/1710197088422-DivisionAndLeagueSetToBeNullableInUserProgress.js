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
exports.DivisionAndLeagueSetToBeNullableInUserProgress1710197088422 = void 0;
class DivisionAndLeagueSetToBeNullableInUserProgress1710197088422 {
    constructor() {
        this.name = 'DivisionAndLeagueSetToBeNullableInUserProgress1710197088422';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ALTER COLUMN "division" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ALTER COLUMN "league" DROP NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ALTER COLUMN "league" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ALTER COLUMN "division" SET NOT NULL`);
        });
    }
}
exports.DivisionAndLeagueSetToBeNullableInUserProgress1710197088422 = DivisionAndLeagueSetToBeNullableInUserProgress1710197088422;
//# sourceMappingURL=1710197088422-DivisionAndLeagueSetToBeNullableInUserProgress.js.map