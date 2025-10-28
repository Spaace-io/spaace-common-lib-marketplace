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
exports.Migrations1761669000725 = void 0;
class Migrations1761669000725 {
    constructor() {
        this.name = 'Migrations1761669000725';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE TABLE "collection_metadata_syncer" (
        "address" CHAR(40) PRIMARY KEY,
        "visited" INTEGER NOT NULL DEFAULT 0,
        "proceed" BOOLEAN NOT NULL DEFAULT false
      )
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_collection_metadata_syncer_proceed" 
      ON "collection_metadata_syncer" ("proceed")
    `);
            yield queryRunner.query(`
      CREATE INDEX "IDX_collection_metadata_syncer_visited" 
      ON "collection_metadata_syncer" ("visited")
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE IF EXISTS "collection_metadata_syncer"`);
        });
    }
}
exports.Migrations1761669000725 = Migrations1761669000725;
//# sourceMappingURL=1761669000725-AddCollectionMetadataSyncer.js.map