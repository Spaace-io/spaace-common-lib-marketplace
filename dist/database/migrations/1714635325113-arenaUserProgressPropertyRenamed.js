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
exports.ArenaUserProgressPropertyRenamed1714635325113 = void 0;
class ArenaUserProgressPropertyRenamed1714635325113 {
    constructor() {
        this.name = 'ArenaUserProgressPropertyRenamed1714635325113';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_20c10956cb163d953e1481757fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME COLUMN "userTwitter" TO "userTwitterId"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME CONSTRAINT "PK_8401b8efb920856c9907965ee07" TO "PK_6450bfdfc1d35a6cef49994c0dd"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_14259a4f20b9564c89f7a31ecce"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME CONSTRAINT "PK_6450bfdfc1d35a6cef49994c0dd" TO "PK_8401b8efb920856c9907965ee07"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" RENAME COLUMN "userTwitterId" TO "userTwitter"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_20c10956cb163d953e1481757fa" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaUserProgressPropertyRenamed1714635325113 = ArenaUserProgressPropertyRenamed1714635325113;
//# sourceMappingURL=1714635325113-arenaUserProgressPropertyRenamed.js.map