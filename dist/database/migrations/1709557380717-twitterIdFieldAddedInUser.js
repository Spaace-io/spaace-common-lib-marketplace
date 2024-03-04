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
exports.TwitterIdFieldAddedInUser1709557380717 = void 0;
class TwitterIdFieldAddedInUser1709557380717 {
    constructor() {
        this.name = 'TwitterIdFieldAddedInUser1709557380717';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_d641a417a7c5f296d3146026c9f"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_20c10956cb163d953e1481757fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e97776d3e4e59017d57714bf39c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "PK_5369e233e18e92fecb08b7991a5"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "PK_e830721892799dc0da5013bbc0d" PRIMARY KEY ("userTwitterId")`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_e830721892799dc0da5013bbc0d"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e97776d3e4e59017d57714bf39c" FOREIGN KEY ("referrerUsername") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_20c10956cb163d953e1481757fa" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_d641a417a7c5f296d3146026c9f" FOREIGN KEY ("twitterName") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5" FOREIGN KEY ("twitterUsername") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" DROP CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_d641a417a7c5f296d3146026c9f"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_20c10956cb163d953e1481757fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e97776d3e4e59017d57714bf39c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_e830721892799dc0da5013bbc0d" UNIQUE ("userTwitterId")`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "PK_e830721892799dc0da5013bbc0d"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "PK_5369e233e18e92fecb08b7991a5" PRIMARY KEY ("twitterUsername")`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e97776d3e4e59017d57714bf39c" FOREIGN KEY ("referrerUsername") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_global_leaderboard" ADD CONSTRAINT "FK_f4169a5bd90ab63ba0a9f3f6d48" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_20c10956cb163d953e1481757fa" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5" FOREIGN KEY ("twitterUsername") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_d641a417a7c5f296d3146026c9f" FOREIGN KEY ("twitterName") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.TwitterIdFieldAddedInUser1709557380717 = TwitterIdFieldAddedInUser1709557380717;
//# sourceMappingURL=1709557380717-twitterIdFieldAddedInUser.js.map