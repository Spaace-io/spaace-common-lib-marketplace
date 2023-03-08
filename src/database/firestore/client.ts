import {
  Firestore,
  CollectionReference,
  DocumentData,
} from '@google-cloud/firestore';
import * as dotenv from 'dotenv';

import { firstSeasonDailyQuests } from './grinds';
import { Quest, Reward, Rule, Season } from './types';

dotenv.config();

class FirestoreClient {
  private readonly store: Firestore;
  public readonly seasons: CollectionReference<DocumentData>;
  public readonly quests: CollectionReference<DocumentData>;

  constructor() {
    this.store = new Firestore({
      projectId: process.env.FIRESTORE_PROJECT_ID,
    });
    this.seasons = this.store.collection('seasons');
    this.quests = this.store.collection('quests');
  }

  /**
   * Initialize the Firestore client
   * Create initial season and quests if not exists
   */
  public async initialize() {
    await this.createInitialSeason();
    console.log('Firestore client initialized.');
  }

  /**
   * Create initial season and quests if not exists
   */
  private async createInitialSeason() {
    const firstSeason = await this.getSeasonByNumber(1);

    if (firstSeason === null) {
      console.log('Creating initial season...');
      const season = await this.store.collection('seasons').add({
        name: 'Welcome to Spaace',
        number: 1,
        startDate: new Date(),
      });

      await this.createInitialQuests(season);
    } else {
      console.log('Initial season already exists, skipping...');
    }
  }

  /**
   * Create initial quests
   * @param season Season reference
   */
  private async createInitialQuests(
    season: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  ) {
    await Promise.all(
      firstSeasonDailyQuests.map(async (data) => {
        const quests = await season.collection('quests').add({
          //name: grind.name,
          daily: data.daily ?? false,
          infinite: data.infinite ?? false,
          // maxCall: data.maxCall,
        });

        await Promise.all([
          ...(data.rewards?.map(async (reward) => {
            await quests.collection('rewards').add({
              questPoints: reward.questPoints,
            });
          }) ?? []),
          ...(data.initRules?.map(async (rule) => {
            await quests.collection('initRules').add({
              property: rule.property,
              operator: rule.operator,
              value: rule.value,
            });
          }) ?? []),
          ...(data.rules?.map(async (rule) => {
            await quests.collection('rules').add({
              property: rule.property,
              operator: rule.operator,
              value: rule.value,
            });
          }) ?? []),
        ]);
      }),
    );
  }

  /**
   * Get season by season number
   * @param number Season number
   * @returns Season or null if not found
   */
  public async getSeasonByNumber(number: number): Promise<Season | null> {
    const seasons = await this.store
      .collection('seasons')
      .where('number', '==', number)
      .limit(1)
      .get();

    if (seasons.docs.length === 0) {
      return null;
    }

    return seasons.docs[0].data() as Season;
  }

  /**
   * Retrieve current season
   * @returns Current season or null if not found
   */
  public async getCurrentSeason(): Promise<Season | null> {
    const snapshot = await this.seasons
      .where('startDate', '<=', new Date())
      .orderBy('startDate', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return {};
    }

    const season = snapshot.docs[0].data() as Season;
    const quests = await snapshot.docs[0].ref.collection('quests').get();

    season.quests = await Promise.all(
      quests.docs.map(async (doc) => {
        const quest = doc.data() as Quest;

        const [initRules, rules, rewards] = await Promise.all([
          doc.ref.collection('initRules').get(),
          doc.ref.collection('rules').get(),
          doc.ref.collection('rewards').get(),
        ]);

        return {
          ...quest,
          initRules: initRules.docs.map((doc) => doc.data() as Rule),
          rules: rules.docs.map((doc) => doc.data() as Rule),
          rewards: rewards.docs.map((doc) => doc.data() as Reward),
        };
      }),
    );

    return season;
  }
}

export default new FirestoreClient();
