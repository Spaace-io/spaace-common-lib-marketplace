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
exports.updateConstraints1671139061340 = void 0;
class updateConstraints1671139061340 {
    constructor() {
        this.name = 'updateConstraints1671139061340';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" ADD "primaryId" character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a" UNIQUE ("primaryId")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "tokenId" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "latest_block" ADD CONSTRAINT "CHK_a6e4d39162b05136d98f963774" CHECK (pk = TRUE)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "latest_block" DROP CONSTRAINT "CHK_a6e4d39162b05136d98f963774"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "tokenId" character varying`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_3d0daef874379da1bde27a22865" PRIMARY KEY ("id", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "PK_3d0daef874379da1bde27a22865"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "UQ_c2b7128a0eb0206aa3332d6ec3a"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "primaryId"`);
        });
    }
}
exports.updateConstraints1671139061340 = updateConstraints1671139061340;
//# sourceMappingURL=1671139061340-updateConstraints.js.map