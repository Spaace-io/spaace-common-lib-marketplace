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
exports.LinkTypes1694256230830 = void 0;
class LinkTypes1694256230830 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`UPDATE "collections" SET "links" = (SELECT json_agg(json_build_object('url', "l"->'url', 'type', UPPER("l"->>'type'))) FROM jsonb_array_elements("links") AS "l") WHERE jsonb_array_length("links") <> 0;`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`UPDATE "collections" SET "links" = (SELECT json_agg(json_build_object('url', "l"->'url', 'type', LOWER("l"->>'type'))) FROM jsonb_array_elements("links") AS "l") WHERE jsonb_array_length("links") <> 0;`);
        });
    }
}
exports.LinkTypes1694256230830 = LinkTypes1694256230830;
//# sourceMappingURL=1694256230830-linkTypes.js.map