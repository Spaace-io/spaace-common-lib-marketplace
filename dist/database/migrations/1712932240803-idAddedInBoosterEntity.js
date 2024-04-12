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
exports.IdAddedInBoosterEntity1712932240803 = void 0;
class IdAddedInBoosterEntity1712932240803 {
    constructor() {
        this.name = 'IdAddedInBoosterEntity1712932240803';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_42fd7236d17ae0b82190e69d159" PRIMARY KEY ("seasonNumber", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ALTER COLUMN "seasonNumber" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_42fd7236d17ae0b82190e69d159"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_d33d583ef49900681a9e08ba229" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_d33d583ef49900681a9e08ba229"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_42fd7236d17ae0b82190e69d159" PRIMARY KEY ("seasonNumber", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_42fd7236d17ae0b82190e69d159"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_ff2a93ab07aa4ef072c403e5e2e" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP CONSTRAINT "PK_8719145dd6b2af6b337e9616c0f"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD CONSTRAINT "PK_2dfca3ef6097d491c1a7f23e6ab" PRIMARY KEY ("seasonNumber", "userTwitter")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP COLUMN "id"`);
        });
    }
}
exports.IdAddedInBoosterEntity1712932240803 = IdAddedInBoosterEntity1712932240803;
//# sourceMappingURL=1712932240803-idAddedInBoosterEntity.js.map