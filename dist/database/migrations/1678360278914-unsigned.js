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
exports.unsigned1678360278914 = void 0;
class unsigned1678360278914 {
    constructor() {
        this.name = 'unsigned1678360278914';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" SET DEFAULT '0'`);
            yield queryRunner.query(`UPDATE "collections" SET "saleCount" = '0' WHERE "saleCount" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "saleCount" TYPE numeric(78,0)`);
        });
    }
}
exports.unsigned1678360278914 = unsigned1678360278914;
//# sourceMappingURL=1678360278914-unsigned.js.map