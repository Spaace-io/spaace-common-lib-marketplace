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
exports.ArenaCrewUpdates1710370543602 = void 0;
class ArenaCrewUpdates1710370543602 {
    constructor() {
        this.name = 'ArenaCrewUpdates1710370543602';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_crews" ("name" text NOT NULL, "owner" text, "description" text, "discord" text, "banner" text, "profile" text, "totalMembers" numeric(78) NOT NULL DEFAULT '0', "totalStarsEarned" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "REL_6a10bdf74fc88e7df1b32251e0" UNIQUE ("owner"), CONSTRAINT "PK_53feb0270ffc58e7ed5f1f0ae46" PRIMARY KEY ("name"))`);
            yield queryRunner.query(`ALTER TABLE "arena_crews" ADD CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02" FOREIGN KEY ("owner") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crews" DROP CONSTRAINT "FK_6a10bdf74fc88e7df1b32251e02"`);
            yield queryRunner.query(`DROP TABLE "arena_crews"`);
        });
    }
}
exports.ArenaCrewUpdates1710370543602 = ArenaCrewUpdates1710370543602;
//# sourceMappingURL=1710370543602-ArenaCrewUpdates.js.map