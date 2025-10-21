import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendModerationAction1760694651123 implements MigrationInterface {
  name = 'ExtendModerationAction1760694651123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
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
  }

  public async down(): Promise<void> {}
}
