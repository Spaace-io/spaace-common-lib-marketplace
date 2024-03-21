import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RanksAddedInUserAndCrewProgress1711052698634 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
