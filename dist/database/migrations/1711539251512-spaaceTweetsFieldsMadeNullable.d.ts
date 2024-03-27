import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class SpaaceTweetsFieldsMadeNullable1711539251512 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
