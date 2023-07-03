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
exports.order1688385486307 = void 0;
class order1688385486307 {
    constructor() {
        this.name = 'order1688385486307';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "orders" ("hash" character(64) NOT NULL, "user" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78), "isAsk" boolean NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_4d54235958f3b7b154936769387" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e906373f7aa5e6fbfe8700f6bd2" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e906373f7aa5e6fbfe8700f6bd2"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_4d54235958f3b7b154936769387"`);
            yield queryRunner.query(`DROP TABLE "orders"`);
        });
    }
}
exports.order1688385486307 = order1688385486307;
//# sourceMappingURL=1688385486307-order.js.map