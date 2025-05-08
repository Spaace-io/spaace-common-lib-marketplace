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
exports.Migrations1746523554986 = void 0;
class Migrations1746523554986 {
    constructor() {
        this.name = 'Migrations1746523554986';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "prime_collections" ("collectionAddress" character(40) NOT NULL, "isPrime" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP, CONSTRAINT "PK_69981a9c4683414ece3931e518a" PRIMARY KEY ("collectionAddress"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "prime_collections"`);
        });
    }
}
exports.Migrations1746523554986 = Migrations1746523554986;
//# sourceMappingURL=1746523554986-prime-collections.js.map