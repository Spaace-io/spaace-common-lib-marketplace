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
exports.Migrations1744889185008 = void 0;
class Migrations1744889185008 {
    constructor() {
        this.name = 'Migrations1744889185008';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."user_xp_log_source" AS ENUM('QUEST', 'REFERRAL')`);
            yield queryRunner.query(`CREATE TABLE "user_xp_log" ("id" SERIAL NOT NULL, "userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "source" "public"."user_xp_log_source" NOT NULL, "metadata" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5dd811b6a094da7a177f8bf5c2a" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_ee91131973231e298882b5c239" ON "user_xp_log" ("userAddress", "seasonNumber", "questId") `);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_40f355303420080acce90be1551" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_cc55dfd5c72db7a23f350a43656" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_a78b252b596a7af68193acf488e" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_a78b252b596a7af68193acf488e"`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_cc55dfd5c72db7a23f350a43656"`);
            yield queryRunner.query(`ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_40f355303420080acce90be1551"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_ee91131973231e298882b5c239"`);
            yield queryRunner.query(`DROP TABLE "user_xp_log"`);
            yield queryRunner.query(`DROP TYPE "public"."user_xp_log_source"`);
        });
    }
}
exports.Migrations1744889185008 = Migrations1744889185008;
//# sourceMappingURL=1744889185008-migrations.js.map