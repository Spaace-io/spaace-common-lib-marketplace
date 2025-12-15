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
exports.Migrations1765785632300 = void 0;
class Migrations1765785632300 {
    constructor() {
        this.name = 'Migrations1765785632300';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the existing primary key constraint
            yield queryRunner.query(`ALTER TABLE "prime_collections" DROP CONSTRAINT "PK_69981a9c4683414ece3931e518a"`);
            // Add the tokenIdRange column as nullable
            yield queryRunner.query(`ALTER TABLE "prime_collections" ADD "tokenIdRange" numrange`);
            // Add id column as new primary key
            yield queryRunner.query(`ALTER TABLE "prime_collections" ADD "id" SERIAL PRIMARY KEY`);
            // Add unique constraint on collectionAddress and tokenIdRange
            // NULL values are treated as distinct in PostgreSQL unique constraints
            yield queryRunner.query(`CREATE UNIQUE INDEX "UQ_prime_collections_address_range" ON "prime_collections" ("collectionAddress", "tokenIdRange")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the unique index
            yield queryRunner.query(`DROP INDEX "UQ_prime_collections_address_range"`);
            // Drop the id column
            yield queryRunner.query(`ALTER TABLE "prime_collections" DROP COLUMN "id"`);
            // Drop the tokenIdRange column
            yield queryRunner.query(`ALTER TABLE "prime_collections" DROP COLUMN "tokenIdRange"`);
            // Restore the original primary key on collectionAddress only
            yield queryRunner.query(`ALTER TABLE "prime_collections" ADD CONSTRAINT "PK_69981a9c4683414ece3931e518a" PRIMARY KEY ("collectionAddress")`);
        });
    }
}
exports.Migrations1765785632300 = Migrations1765785632300;
//# sourceMappingURL=1765785632300-add-token-id-range-to-prime-collections.js.map