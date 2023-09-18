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
exports.updateUser1671136504739 = void 0;
class updateUser1671136504739 {
    constructor() {
        this.name = 'updateUser1671136504739';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "address" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "id" integer NOT NULL DEFAULT nextval('user_id_seq')`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        });
    }
}
exports.updateUser1671136504739 = updateUser1671136504739;
//# sourceMappingURL=1671136504739-updateUser.js.map