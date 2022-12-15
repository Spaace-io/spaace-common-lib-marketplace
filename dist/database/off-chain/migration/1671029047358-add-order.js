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
exports.addOrder1671029047358 = void 0;
class addOrder1671029047358 {
    constructor() {
        this.name = 'addOrder1671029047358';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "item" character varying, "isAsk" boolean NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "endTime" character varying NOT NULL, "startTime" character varying NOT NULL, "collection" character varying NOT NULL, "hash" character varying NOT NULL, "signer" character varying NOT NULL, "signature" character varying NOT NULL, "strategy" character varying NOT NULL, "tokenId" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "order"`);
        });
    }
}
exports.addOrder1671029047358 = addOrder1671029047358;
//# sourceMappingURL=1671029047358-add-order.js.map