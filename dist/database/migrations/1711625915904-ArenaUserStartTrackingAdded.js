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
exports.ArenaUserStartTrackingAdded1711625915904 = void 0;
class ArenaUserStartTrackingAdded1711625915904 {
    constructor() {
        this.name = 'ArenaUserStartTrackingAdded1711625915904';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_user_stars_tracking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitter" text NOT NULL, "stars" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bbafe775a9c17fc0288642d410f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" ADD CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" DROP CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828"`);
            yield queryRunner.query(`DROP TABLE "arena_user_stars_tracking"`);
        });
    }
}
exports.ArenaUserStartTrackingAdded1711625915904 = ArenaUserStartTrackingAdded1711625915904;
//# sourceMappingURL=1711625915904-ArenaUserStartTrackingAdded.js.map