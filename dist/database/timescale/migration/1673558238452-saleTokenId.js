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
exports.saleTokenId1673558238452 = void 0;
class saleTokenId1673558238452 {
    constructor() {
        this.name = 'saleTokenId1673558238452';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_354b5569d90586d67c231431396" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp")`);
            yield queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD "tokenId" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_354b5569d90586d67c231431396"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp", "tokenId")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_354b5569d90586d67c231431396" PRIMARY KEY ("txHash", "logIdx", "collection", "timestamp")`);
            yield queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD "tokenId" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "PK_354b5569d90586d67c231431396"`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "PK_ac5eeb91eb3fc340e8348ec230d" PRIMARY KEY ("txHash", "logIdx", "collection", "tokenId", "timestamp")`);
        });
    }
}
exports.saleTokenId1673558238452 = saleTokenId1673558238452;
//# sourceMappingURL=1673558238452-saleTokenId.js.map