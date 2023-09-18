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
exports.hiddenItems1689792471987 = void 0;
class hiddenItems1689792471987 {
    constructor() {
        this.name = 'hiddenItems1689792471987';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "hidden_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_c84aeceb104a1a0f0e923e1ab15" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`);
            yield queryRunner.query(`ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c"`);
            yield queryRunner.query(`DROP TABLE "hidden_items"`);
        });
    }
}
exports.hiddenItems1689792471987 = hiddenItems1689792471987;
//# sourceMappingURL=1689792471987-hiddenItems.js.map