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
exports.init1670602246178 = void 0;
class init1670602246178 {
    constructor() {
        this.name = 'init1670602246178';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "tokenId" character varying, "isRefreshed" boolean NOT NULL DEFAULT false, "lastTimeUpdate" TIMESTAMP, "tokenUri" character varying, "attributes" jsonb, "medias" jsonb, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "collectionId" character varying, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "collections" ("id" character varying NOT NULL, "deployedOwner" character varying, "name" character varying, "countOwner" character varying, "symbol" character varying, "totalSupply" integer, "tokenType" character varying, "abi" jsonb, "imageUrl" character varying, "active" boolean NOT NULL DEFAULT true, "verified" boolean NOT NULL DEFAULT false, "explicit" boolean NOT NULL DEFAULT false, "bannerUrl" character varying, "description" character varying, "highOffer" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4ac36bcb5af17969055999c84e3" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4ac36bcb5af17969055999c84e3"`);
            yield queryRunner.query(`DROP TABLE "collections"`);
            yield queryRunner.query(`DROP TABLE "items"`);
        });
    }
}
exports.init1670602246178 = init1670602246178;
//# sourceMappingURL=1670602246178-init.js.map