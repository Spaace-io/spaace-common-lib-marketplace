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
exports.ArenaUserEarnedChest1708695732864 = void 0;
class ArenaUserEarnedChest1708695732864 {
    constructor() {
        this.name = 'ArenaUserEarnedChest1708695732864';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_users_earned_chest" ("userTwitter" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "xp" numeric(78) NOT NULL DEFAULT '0', "chestName" text NOT NULL, "isClaimed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b20ed80de8c81d3414a1ef5b79c" PRIMARY KEY ("userTwitter", "seasonNumber"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_c444df2f8a5844d243962e74a57" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_c444df2f8a5844d243962e74a57"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`);
            yield queryRunner.query(`DROP TABLE "arena_users_earned_chest"`);
        });
    }
}
exports.ArenaUserEarnedChest1708695732864 = ArenaUserEarnedChest1708695732864;
//# sourceMappingURL=1708695732864-ArenaUserEarnedChest.js.map