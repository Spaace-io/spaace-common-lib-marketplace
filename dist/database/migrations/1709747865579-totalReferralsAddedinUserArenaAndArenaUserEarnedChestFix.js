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
exports.TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579 = void 0;
class TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579 {
    constructor() {
        this.name = 'TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "totalReferrals" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_8186abb732ca235605d0271904e" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_8186abb732ca235605d0271904e"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b" PRIMARY KEY ("seasonNumber", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ALTER COLUMN "seasonNumber" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_d2d5c36f6503c8772dc1b8d05bc" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_d2d5c36f6503c8772dc1b8d05bc"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b" PRIMARY KEY ("seasonNumber", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ALTER COLUMN "seasonNumber" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_54595f0e5fbfd187b0d2e080e4b"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_8186abb732ca235605d0271904e" PRIMARY KEY ("seasonNumber", "userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "PK_8186abb732ca235605d0271904e"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c" PRIMARY KEY ("seasonNumber", "userTwitter")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "totalReferrals"`);
        });
    }
}
exports.TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579 = TotalReferralsAddedinUserArenaAndArenaUserEarnedChestFix1709747865579;
//# sourceMappingURL=1709747865579-totalReferralsAddedinUserArenaAndArenaUserEarnedChestFix.js.map