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
exports.CreateUserAirdropChestView1751018416141 = void 0;
class CreateUserAirdropChestView1751018416141 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      CREATE VIEW "user_airdrop_chest_view" AS
      SELECT 
        u.address,
        jsonb_build_object(
          'id', t.id,
          'name', t.name,
          'totalXp', t."totalXp",
          'totalChestsCount', t."totalChestsCount"
        ) as tier,
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', c.id,
              'name', c.name,
              'valueXp', c."valueXp",
              'status', uc.status,
              'tier', jsonb_build_object(
                'id', t.id,
                'name', t.name,
                'totalXp', t."totalXp",
                'totalChestsCount', t."totalChestsCount"
              )
            )
          )
          FROM "airdrop_users_chests" uc
          INNER JOIN "airdrop_chests" c ON c.id = uc."chestId"
          WHERE uc.address = u.address
        ) as chests
      FROM "airdrop_users" u
      INNER JOIN "airdrop_tiers" t ON t.id = u."tierId"
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('DROP VIEW IF EXISTS "user_airdrop_chest_view"');
        });
    }
}
exports.CreateUserAirdropChestView1751018416141 = CreateUserAirdropChestView1751018416141;
//# sourceMappingURL=1751018416141-create-user-airdrop-chest-view.js.map