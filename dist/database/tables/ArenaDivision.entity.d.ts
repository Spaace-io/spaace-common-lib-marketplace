import { BaseEntity } from 'typeorm';
import { ArenaDivisionName } from '../enums';
export declare class ArenaDivision extends BaseEntity {
    seasonNumber: string;
    name: ArenaDivisionName;
    numberOfLeagues: string;
}
