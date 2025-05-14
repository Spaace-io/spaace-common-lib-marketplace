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
exports.Migrations1747137827011 = void 0;
class Migrations1747137827011 {
    constructor() {
        this.name = 'Migrations1747137827011';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "xp_multiplier" ("id" SERIAL NOT NULL, "userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "multiplier" numeric(78,2) NOT NULL DEFAULT '1', "metadata" jsonb NOT NULL, "expiresAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c80c044c4c600feda6db90e858" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_900ea15610f865f3accbfe7cba" ON "xp_multiplier" ("userAddress", "seasonNumber") `);
            yield queryRunner.query(`ALTER TABLE "xp_multiplier" ADD CONSTRAINT "FK_a2273cf2f34ea79ea1c130fec68" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "xp_multiplier" ADD CONSTRAINT "FK_905e7cb9035f4e905e502a87c96" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "xp_multiplier" DROP CONSTRAINT "FK_905e7cb9035f4e905e502a87c96"`);
            yield queryRunner.query(`ALTER TABLE "xp_multiplier" DROP CONSTRAINT "FK_a2273cf2f34ea79ea1c130fec68"`);
            yield queryRunner.query(`DROP TABLE "xp_multiplier"`);
            yield queryRunner.query(`DROP INDEX "IDX_900ea15610f865f3accbfe7cba"`);
        });
    }
}
exports.Migrations1747137827011 = Migrations1747137827011;
//# sourceMappingURL=1747137827011-xp-multiplier.js.map