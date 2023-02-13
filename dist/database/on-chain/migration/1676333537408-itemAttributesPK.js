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
exports.itemAttributesPK1676333537408 = void 0;
class itemAttributesPK1676333537408 {
    constructor() {
        this.name = 'itemAttributesPK1676333537408';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_4b8decd338cc6c75234f320c0bc" PRIMARY KEY ("collection", "tokenId", "trait")`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b" UNIQUE ("trait")`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_4b8decd338cc6c75234f320c0bc"`);
            yield queryRunner.query(`ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61" PRIMARY KEY ("collection", "tokenId")`);
        });
    }
}
exports.itemAttributesPK1676333537408 = itemAttributesPK1676333537408;
//# sourceMappingURL=1676333537408-itemAttributesPK.js.map