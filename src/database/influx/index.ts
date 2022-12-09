import { HttpError, InfluxDB } from '@influxdata/influxdb-client';
import { BucketsAPI, OrgsAPI } from '@influxdata/influxdb-client-apis';
import '../../config';

const url = process.env.INFLUXDB_URL!;
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG ?? '';

export const InfluxDatabase = new InfluxDB({
    url,
    token,
});

let orgID: string | undefined = undefined;

export async function getOrgID() {
    if (orgID === undefined) {
        const { orgs } = await new OrgsAPI(InfluxDatabase).getOrgs({
            org
        });

        if (orgs === undefined || orgs.length !== 1 || orgs[0].id == undefined)
            throw new Error(`No organization named "${org}" found!`);

        orgID = orgs[0].id;
    }

    return orgID;
}

export const InfluxQueryApi = InfluxDatabase.getQueryApi(org);

export async function getWriteApi(bucket: string) {
    const bucketsAPI = new BucketsAPI(InfluxDatabase);

    try {
        await bucketsAPI.postBuckets({
            body: {
                name: bucket,
                orgID: await getOrgID(),
            },
        });
    } catch (e) {
        if (!(e instanceof HttpError) || e.statusCode !== 422 || e.json.code !== 'conflict')
            throw e;
    }

    return InfluxDatabase.getWriteApi(org, bucket, 's');
}

export * from './bucket';
