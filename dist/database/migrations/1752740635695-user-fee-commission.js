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
exports.Migrations1752740635695 = void 0;
class Migrations1752740635695 {
    constructor() {
        this.name = 'Migrations1752740635695';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users_fee_commission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character(40) NOT NULL, "day" character varying(10) NOT NULL, "accumulated" numeric(78) NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_682ce5ae173d980b2390f0cfddb" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "users_fee_commission"`);
        });
    }
}
exports.Migrations1752740635695 = Migrations1752740635695;
//# sourceMappingURL=1752740635695-user-fee-commission.js.map