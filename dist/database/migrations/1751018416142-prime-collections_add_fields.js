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
exports.Migrations1751018416142 = void 0;
class Migrations1751018416142 {
    constructor() {
        this.name = 'Migrations1751018416142';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add featured field to collections
            yield queryRunner.query(`ALTER TABLE "prime_collections" ADD COLUMN "name" text`);
            // Add featuredOrder field to collections
            yield queryRunner.query(`ALTER TABLE "prime_collections" ADD COLUMN "imageUrl" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the added columns in reverse order
            yield queryRunner.query(`ALTER TABLE "prime_collections" DROP COLUMN "name"`);
            yield queryRunner.query(`ALTER TABLE "prime_collections" DROP COLUMN "imageUrl"`);
        });
    }
}
exports.Migrations1751018416142 = Migrations1751018416142;
//# sourceMappingURL=1751018416142-prime-collections_add_fields.js.map