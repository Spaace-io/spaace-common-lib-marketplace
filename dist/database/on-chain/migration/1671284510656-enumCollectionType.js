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
exports.enumCollectionType1671284510656 = void 0;
class enumCollectionType1671284510656 {
    constructor() {
        this.name = 'enumCollectionType1671284510656';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "tokenType" TO "type"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "type"`);
            yield queryRunner.query(`CREATE TYPE "public"."collection_type" AS ENUM('ERC721', 'ERC1155')`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "type" "public"."collection_type" NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "type"`);
            yield queryRunner.query(`DROP TYPE "public"."collection_type"`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "type" character varying`);
            yield queryRunner.query(`ALTER TABLE "collections" RENAME COLUMN "type" TO "tokenType"`);
        });
    }
}
exports.enumCollectionType1671284510656 = enumCollectionType1671284510656;
//# sourceMappingURL=1671284510656-enumCollectionType.js.map