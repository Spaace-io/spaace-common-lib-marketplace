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
exports.MergeDatabases1695136745634 = void 0;
class MergeDatabases1695136745634 {
    constructor() {
        this.name = 'MergeDatabases1695136745634';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "login_nonces" ("nonce" character(32) NOT NULL, "address" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8da3f5a598f7e0e5744cf7680d4" PRIMARY KEY ("nonce"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("address" character(40) NOT NULL, "name" text, "biography" text, "imageUrl" text, "bannerUrl" text, "admin" boolean NOT NULL DEFAULT false, "referralCode" text NOT NULL, "referrerAddress" character(40), "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899" UNIQUE ("referralCode"), CONSTRAINT "PK_b0ec0293d53a1385955f9834d5c" PRIMARY KEY ("address"))`);
            yield queryRunner.query(`CREATE TABLE "notable_collections" ("collectionAddress" character(40) NOT NULL, CONSTRAINT "PK_b927dbd37a77ed934fcf53d185d" PRIMARY KEY ("collectionAddress"))`);
            yield queryRunner.query(`CREATE TABLE "hidden_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_c84aeceb104a1a0f0e923e1ab15" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`);
            yield queryRunner.query(`CREATE TABLE "seasons" ("number" numeric(78) NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, CONSTRAINT "PK_4b3a0e07a243b350d51796064d3" PRIMARY KEY ("number"))`);
            yield queryRunner.query(`CREATE TYPE "public"."rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`);
            yield queryRunner.query(`CREATE TABLE "season_ranks" ("seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "threshold" numeric(78) NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_5700c760e314c8816befbdc2c69" PRIMARY KEY ("seasonNumber", "rank"))`);
            yield queryRunner.query(`CREATE TYPE "public"."quest_period" AS ENUM('DAILY', 'SEASONAL')`);
            yield queryRunner.query(`CREATE TABLE "quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "prime" boolean NOT NULL DEFAULT false, "steps" jsonb NOT NULL DEFAULT '[]', "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0', "boost" numeric(78) NOT NULL DEFAULT '0', "boostLimit" numeric(78), "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_f94aec94cffab50834b8edaa1f" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_3a6a6a0b62780e61b384452424b" PRIMARY KEY ("seasonNumber", "id"))`);
            yield queryRunner.query(`CREATE TABLE "user_loyalties" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "points" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5254410832e753bed54603862d8" PRIMARY KEY ("userAddress", "seasonNumber"))`);
            yield queryRunner.query(`CREATE TABLE "user_quest_progress" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentStep" numeric(78) NOT NULL DEFAULT '0', "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce"))`);
            yield queryRunner.query(`CREATE TABLE "user_season_rank_claims" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a26daaaa51a62c72f07c4d843d9" PRIMARY KEY ("userAddress", "seasonNumber", "rank"))`);
            yield queryRunner.query(`CREATE TABLE "cart_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_a0df34081b7a800e85cd78cfce3" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`);
            yield queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId"), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."report_reason" AS ENUM('FAKE', 'EXPLICIT', 'SPAM', 'OTHER')`);
            yield queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "reason" "public"."report_reason" NOT NULL, CONSTRAINT "UQ_66592117509d55235181645b336" UNIQUE ("userAddress", "collectionAddress", "tokenId"), CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727" FOREIGN KEY ("referrerAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" ADD CONSTRAINT "FK_3de617019fd4e649528fc62ec68" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_716a446b06578c914ef61ad1fd6" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_716a446b06578c914ef61ad1fd6"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_08d46aabc8a8b3d4feaa3699c58"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP CONSTRAINT "FK_90c3ede260ebd4ffdd4411097c6"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "FK_0d6ae099c6fe57b0aaf4a8ed5b2"`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" DROP CONSTRAINT "FK_3de617019fd4e649528fc62ec68"`);
            yield queryRunner.query(`ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d6bd3a207f60b3ac223dfc96727"`);
            yield queryRunner.query(`DROP TABLE "reports"`);
            yield queryRunner.query(`DROP TYPE "public"."report_reason"`);
            yield queryRunner.query(`DROP TABLE "likes"`);
            yield queryRunner.query(`DROP TABLE "cart_items"`);
            yield queryRunner.query(`DROP TABLE "user_season_rank_claims"`);
            yield queryRunner.query(`DROP TABLE "user_quest_progress"`);
            yield queryRunner.query(`DROP TABLE "user_loyalties"`);
            yield queryRunner.query(`DROP TABLE "quests"`);
            yield queryRunner.query(`DROP TYPE "public"."quest_period"`);
            yield queryRunner.query(`DROP TABLE "season_ranks"`);
            yield queryRunner.query(`DROP TYPE "public"."rank"`);
            yield queryRunner.query(`DROP TABLE "seasons"`);
            yield queryRunner.query(`DROP TABLE "hidden_items"`);
            yield queryRunner.query(`DROP TABLE "notable_collections"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "login_nonces"`);
        });
    }
}
exports.MergeDatabases1695136745634 = MergeDatabases1695136745634;
//# sourceMappingURL=1695136745634-mergeDatabases.js.map