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
exports.ArenaDivisionRelationAddedInProgress1711572374108 = void 0;
class ArenaDivisionRelationAddedInProgress1711572374108 {
    constructor() {
        this.name = 'ArenaDivisionRelationAddedInProgress1711572374108';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "division"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "division" "public"."arena_divison_name"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd" FOREIGN KEY ("seasonNumber", "division") REFERENCES "arena_divisions"("seasonNumber","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_de0c0fbb57f205a6e1e38fcadcd"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "division"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "division" text`);
        });
    }
}
exports.ArenaDivisionRelationAddedInProgress1711572374108 = ArenaDivisionRelationAddedInProgress1711572374108;
//# sourceMappingURL=1711572374108-ArenaDivisionRelationAddedInProgress.js.map