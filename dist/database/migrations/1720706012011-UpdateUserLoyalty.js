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
exports.UpdateUserLoyalty1720706012011 = void 0;
class UpdateUserLoyalty1720706012011 {
    constructor() {
        this.name = 'UpdateUserLoyalty1720706012011';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD "rank" "public"."rank" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "PK_5254410832e753bed54603862d8"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "PK_18188fc290d83e7bed6d21e16e8" PRIMARY KEY ("seasonNumber", "userAddress", "rank")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "PK_18188fc290d83e7bed6d21e16e8"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("seasonNumber", "userAddress")`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "rank"`);
        });
    }
}
exports.UpdateUserLoyalty1720706012011 = UpdateUserLoyalty1720706012011;
//# sourceMappingURL=1720706012011-UpdateUserLoyalty.js.map