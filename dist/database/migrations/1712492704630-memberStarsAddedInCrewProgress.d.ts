import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class MemberStarsAddedInCrewProgress1712492704630 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
