import { Firestore } from '@google-cloud/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

export default new Firestore({ projectId: process.env.FIRESTORE_PROJECT_ID });
