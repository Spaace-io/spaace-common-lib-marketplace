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
exports.CreationDateAddedInArenaCrew1711113214958 = void 0;
class CreationDateAddedInArenaCrew1711113214958 {
    constructor() {
        this.name = 'CreationDateAddedInArenaCrew1711113214958';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crews" ADD "creationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crews" DROP COLUMN "creationDate"`);
        });
    }
}
exports.CreationDateAddedInArenaCrew1711113214958 = CreationDateAddedInArenaCrew1711113214958;
//# sourceMappingURL=1711113214958-CreationDateAddedInArenaCrew.js.map