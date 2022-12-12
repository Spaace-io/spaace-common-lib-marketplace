import { Point, WriteApi } from '@influxdata/influxdb-client';
export declare class Transfer {
    static readonly BUCKET_NAME = "transfers";
    static readonly MEASUREMENT_NAME = "transfer";
    private static writeApi?;
    readonly hash: string;
    readonly from: string;
    readonly to: string;
    readonly collection: string;
    readonly item: string;
    readonly amount: string;
    readonly timestamp: number;
    constructor(hash: string, from: string, to: string, collection: string, item: string, amount: string, timestamp: number);
    toPoint(): Point;
    write(flush?: boolean): Promise<void>;
    static getWriteApi(): Promise<WriteApi>;
}
