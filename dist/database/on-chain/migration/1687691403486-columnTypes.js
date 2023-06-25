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
exports.columnTypes1687691403486 = void 0;
class columnTypes1687691403486 {
    constructor() {
        this.name = 'columnTypes1687691403486';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "latest_block" ALTER COLUMN "number" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "name" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "symbol" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "imageUrl" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "bannerUrl" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "description" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "title" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" TYPE text`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "tokenUri" TYPE text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "tokenUri" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "title" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "description" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "bannerUrl" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "imageUrl" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "symbol" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" ALTER COLUMN "name" TYPE character varying`);
            yield queryRunner.query(`ALTER TABLE "latest_block" ALTER COLUMN "number" TYPE integer`);
        });
    }
}
exports.columnTypes1687691403486 = columnTypes1687691403486;
//# sourceMappingURL=1687691403486-columnTypes.js.map