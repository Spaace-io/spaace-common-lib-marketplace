import { Firestore } from '@google-cloud/firestore';
import * as dotenv from 'dotenv';

import { firstSeasonDailyGrinds } from './grinds';
import { Season } from './types';

dotenv.config();

class FirestoreClient {
  public readonly store: Firestore;

  constructor() {
    this.store = new Firestore({
      projectId: process.env.FIRESTORE_PROJECT_ID,
    });
  }

  private async createInitialSeason() {
    const firstSeason = await this.getSeasonByNumber(1);

    if (firstSeason === null) {
      console.log('Creating initial season...');
      await this.store.collection('seasons').add({
        name: 'Welcome to Spaace',
        number: 1,
        startDate: new Date(),
        grinds: [...firstSeasonDailyGrinds],
      });
    } else {
      console.log('Initial season already exists, skipping...');
    }
  }

  public async initialize() {
    await this.createInitialSeason();
  }

  public async getSeasonByNumber(number: number): Promise<Season | null> {
    const seasons = await this.store
      .collection('seasons')
      .where('number', '==', number)
      .get();

    if (seasons.docs.length === 0) {
      return null;
    }

    return seasons.docs[0].data() as Season;
  }
}

export default new FirestoreClient();
