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
exports.notableCollections1686241295922 = void 0;
class notableCollections1686241295922 {
    constructor() {
        this.name = 'notableCollections1686241295922';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "notable_collections" ("collection" character(40) NOT NULL, CONSTRAINT "PK_5a76a7e64f51ddc26c6201ff047" PRIMARY KEY ("collection"))`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "collection" TYPE character(40)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "collection" TYPE character varying`);
            yield queryRunner.query(`DROP TABLE "notable_collections"`);
        });
    }
}
exports.notableCollections1686241295922 = notableCollections1686241295922;
//# sourceMappingURL=1686241295922-notableCollections.js.map