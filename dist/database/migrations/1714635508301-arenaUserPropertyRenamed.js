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
exports.ArenaUserPropertyRenamed1714635508301 = void 0;
class ArenaUserPropertyRenamed1714635508301 {
    constructor() {
        this.name = 'ArenaUserPropertyRenamed1714635508301';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e97776d3e4e59017d57714bf39c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" RENAME COLUMN "referrerUsername" TO "referrerTwitterId"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e72375a5ddde4bde7fe3a6958d8" FOREIGN KEY ("referrerTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_e72375a5ddde4bde7fe3a6958d8"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users" RENAME COLUMN "referrerTwitterId" TO "referrerUsername"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_e97776d3e4e59017d57714bf39c" FOREIGN KEY ("referrerUsername") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ArenaUserPropertyRenamed1714635508301 = ArenaUserPropertyRenamed1714635508301;
//# sourceMappingURL=1714635508301-arenaUserPropertyRenamed.js.map