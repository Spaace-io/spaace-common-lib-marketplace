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
exports.rewardsSignature1691087839483 = void 0;
class rewardsSignature1691087839483 {
    constructor() {
        this.name = 'rewardsSignature1691087839483';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" ADD "signature" text NOT NULL`);
            yield queryRunner.query(`ALTER TYPE "public"."reward_period_type" RENAME TO "reward_period_type_old"`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."distributor_contract" USING "distributor"::"text"::"public"."distributor_contract"`);
            yield queryRunner.query(`DROP TYPE "public"."reward_period_type_old"`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "endTime" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_3d0844cdd46863d617cbba6297" CHECK ("pk")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_3d0844cdd46863d617cbba6297"`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "endTime" DROP NOT NULL`);
            yield queryRunner.query(`CREATE TYPE "public"."reward_period_type_old" AS ENUM('Trading', 'Referral')`);
            yield queryRunner.query(`ALTER TABLE "reward_periods" ALTER COLUMN "distributor" TYPE "public"."reward_period_type_old" USING "distributor"::"text"::"public"."reward_period_type_old"`);
            yield queryRunner.query(`ALTER TYPE "public"."reward_period_type_old" RENAME TO "reward_period_type"`);
            yield queryRunner.query(`ALTER TABLE "distributor_rewards" DROP COLUMN "signature"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ((pk = true))`);
        });
    }
}
exports.rewardsSignature1691087839483 = rewardsSignature1691087839483;
//# sourceMappingURL=1691087839483-rewardsSignature.js.map