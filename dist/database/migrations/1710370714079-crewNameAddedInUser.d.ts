import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CrewNameAddedInUser1710370714079 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
