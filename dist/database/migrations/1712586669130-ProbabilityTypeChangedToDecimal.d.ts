import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ProbabilityTypeChangedToDecimal1712586669130 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
