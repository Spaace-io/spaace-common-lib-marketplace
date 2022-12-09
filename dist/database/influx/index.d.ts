import { InfluxDB } from '@influxdata/influxdb-client';
export declare const InfluxDatabase: InfluxDB;
export declare function getOrgID(): Promise<string>;
export declare const InfluxQueryApi: import("@influxdata/influxdb-client").QueryApi;
export declare function getWriteApi(bucket: string): Promise<import("@influxdata/influxdb-client").WriteApi>;
export * from './bucket';
