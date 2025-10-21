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
exports.ExtendModerationAction1760694651123 = void 0;
class ExtendModerationAction1760694651123 {
    constructor() {
        this.name = 'ExtendModerationAction1760694651123';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_enum
          WHERE enumlabel = 'AUTO_REVIEW'
            AND enumtypid = 'public.moderation_action_enum'::regtype
        ) THEN
          ALTER TYPE "public"."moderation_action_enum" ADD VALUE 'AUTO_REVIEW';
        END IF;
      END
      $$;
    `);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ExtendModerationAction1760694651123 = ExtendModerationAction1760694651123;
//# sourceMappingURL=1760694651123-ExtendModerationAction.js.map