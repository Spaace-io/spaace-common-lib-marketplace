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
exports.itemAttributes1675359942694 = void 0;
class itemAttributes1675359942694 {
    constructor() {
        this.name = 'itemAttributes1675359942694';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "item_attributes" ("collection" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "trait" text NOT NULL, "value" text NOT NULL, CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b" UNIQUE ("trait"), CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61" PRIMARY KEY ("collection", "tokenId"))`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "attributes"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "attributes" jsonb`);
            yield queryRunner.query(`DROP TABLE "item_attributes"`);
        });
    }
}
exports.itemAttributes1675359942694 = itemAttributes1675359942694;
//# sourceMappingURL=1675359942694-itemAttributes.js.map