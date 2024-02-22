import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class PointsRenamedToStars1708600874992 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
