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
exports.updateOrder1673008202307 = void 0;
class updateOrder1673008202307 {
    constructor() {
        this.name = 'updateOrder1673008202307';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "item"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_ba4700a944a033f4d97074cedfb"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderHash"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "hash" character(64) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash")`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "tokenId" character varying`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "user" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "user" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_13ab9c024e81573c05451b9004f"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "hash"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "orderHash" character(64) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_ba4700a944a033f4d97074cedfb" PRIMARY KEY ("orderHash")`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "item" character varying`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.updateOrder1673008202307 = updateOrder1673008202307;
//# sourceMappingURL=1673008202307-updateOrder.js.map