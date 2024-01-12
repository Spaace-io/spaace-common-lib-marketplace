import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddLikeView1705072344276 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
