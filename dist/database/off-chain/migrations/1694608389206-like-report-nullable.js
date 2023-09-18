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
exports.LikeReportNullable1694608389206 = void 0;
class LikeReportNullable1694608389206 {
    constructor() {
        this.name = 'LikeReportNullable1694608389206';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "likes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_dd8b4ee8d658dbbc0a9360f28b9"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_66592117509d55235181645b336"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_3a9c67133f5aa9043af06394c91" PRIMARY KEY ("collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_3a9c67133f5aa9043af06394c91"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a" PRIMARY KEY ("tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a"`);
            yield queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "tokenId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_94709cf71c27ccf90268b815a23" PRIMARY KEY ("collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_94709cf71c27ccf90268b815a23"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0" PRIMARY KEY ("tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0"`);
            yield queryRunner.query(`ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "reports" ALTER COLUMN "tokenId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "UQ_66592117509d55235181645b336"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_d9013193989303580053c0b5ef6"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0" PRIMARY KEY ("tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" ALTER COLUMN "tokenId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "reports" ALTER COLUMN "tokenId" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_98ce7f36f32635a20a23ccd62d0"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_94709cf71c27ccf90268b815a23" PRIMARY KEY ("collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_94709cf71c27ccf90268b815a23"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_a9323de3f8bced7539a794b4a37"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a" PRIMARY KEY ("tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "tokenId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "tokenId" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_a7f995096a6ad5ab48afe20f43a"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_3a9c67133f5aa9043af06394c91" PRIMARY KEY ("collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_3a9c67133f5aa9043af06394c91"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId", "id")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "PK_cf9f3ee85f9ce1c8570c62da60d"`);
            yield queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "PK_66592117509d55235181645b336" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "reports" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "PK_304a53a794b64f5f1a0267a3e22"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "PK_dd8b4ee8d658dbbc0a9360f28b9" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId")`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "id"`);
        });
    }
}
exports.LikeReportNullable1694608389206 = LikeReportNullable1694608389206;
//# sourceMappingURL=1694608389206-like-report-nullable.js.map