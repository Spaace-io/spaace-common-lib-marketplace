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
exports.WowChestSchemaAdded1712579435104 = void 0;
class WowChestSchemaAdded1712579435104 {
    constructor() {
        this.name = 'WowChestSchemaAdded1712579435104';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."arena_wow_chest_type" AS ENUM('XP', 'TOKEN', 'BOOSTER')`);
            yield queryRunner.query(`CREATE TABLE "arena_wow_chest_probability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."arena_wow_chest_type" NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "probability" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_3343967b7e6f23a8908cad8cdb7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "arena_wow_chest_period" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL DEFAULT now(), "numberOfChest" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_dcbdc01eba32a92f4751543d688" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "arena_users_claimed_wow_chest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userTwitter" text NOT NULL, "chestPeriod" uuid NOT NULL, "type" text NOT NULL, "value" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38f29efec3d06710a103f5e43c6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc" FOREIGN KEY ("chestPeriod") REFERENCES "arena_wow_chest_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_afb6b41c7961ff5a2850c8943cc"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5"`);
            yield queryRunner.query(`DROP TABLE "arena_users_claimed_wow_chest"`);
            yield queryRunner.query(`DROP TABLE "arena_wow_chest_period"`);
            yield queryRunner.query(`DROP TABLE "arena_wow_chest_probability"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type"`);
        });
    }
}
exports.WowChestSchemaAdded1712579435104 = WowChestSchemaAdded1712579435104;
//# sourceMappingURL=1712579435104-WowChestSchemaAdded.js.map