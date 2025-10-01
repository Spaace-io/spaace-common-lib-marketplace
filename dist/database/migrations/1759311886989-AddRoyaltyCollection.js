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
exports.AddRoyaltyCollection1759311886989 = void 0;
class AddRoyaltyCollection1759311886989 {
    constructor() {
        this.name = 'AddRoyaltyCollection1759311886989';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_royalty_collections" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "firstPaidAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "totalRoyaltyWei" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_855574ef1b37510022eae960c5b" PRIMARY KEY ("userAddress", "collectionAddress"))`);
            yield queryRunner.query(`CREATE TABLE "user_collection_royalty_track_block" ("id" SERIAL NOT NULL, "lastProcessedId" bigint NOT NULL DEFAULT '0', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6170230542725403d5d6968c9a5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD "id" BIGSERIAL NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id"`);
            yield queryRunner.query(`DROP TABLE "user_collection_royalty_track_block"`);
            yield queryRunner.query(`DROP TABLE "user_royalty_collections"`);
        });
    }
}
exports.AddRoyaltyCollection1759311886989 = AddRoyaltyCollection1759311886989;
//# sourceMappingURL=1759311886989-AddRoyaltyCollection.js.map