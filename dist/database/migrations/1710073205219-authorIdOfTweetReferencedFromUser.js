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
exports.AuthorIdOfTweetReferencedFromUser1710073205219 = void 0;
class AuthorIdOfTweetReferencedFromUser1710073205219 {
    constructor() {
        this.name = 'AuthorIdOfTweetReferencedFromUser1710073205219';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_tweet" ADD CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072" FOREIGN KEY ("authorId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_tweet" DROP CONSTRAINT "FK_07accd2c97ad4cab9b5ddbeb072"`);
        });
    }
}
exports.AuthorIdOfTweetReferencedFromUser1710073205219 = AuthorIdOfTweetReferencedFromUser1710073205219;
//# sourceMappingURL=1710073205219-authorIdOfTweetReferencedFromUser.js.map