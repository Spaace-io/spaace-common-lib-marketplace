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
exports.Migrations1729502575234 = void 0;
class Migrations1729502575234 {
    constructor() {
        this.name = 'Migrations1729502575234';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "PK_9ea5d8ab28cb5bb9b7c09d6674c"`);
            yield queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "PK_ce4b762f4246205df79d7c0d29e" PRIMARY KEY ("hash", "collectionAddress", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`CREATE INDEX "IDX_f1316a9334a23e5c5b1b180e32" ON "orders_items" ("hash", "collectionAddress") `);
            yield queryRunner.query(`CREATE INDEX "IDX_3ceaf9a1e2286ed3b7ac7b3e6a" ON "orders_items" ("hash") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_3ceaf9a1e2286ed3b7ac7b3e6a"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_f1316a9334a23e5c5b1b180e32"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "PK_ce4b762f4246205df79d7c0d29e"`);
            yield queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "PK_9ea5d8ab28cb5bb9b7c09d6674c" PRIMARY KEY ("hash", "tokenId")`);
        });
    }
}
exports.Migrations1729502575234 = Migrations1729502575234;
//# sourceMappingURL=1729502575234-migrations.js.map