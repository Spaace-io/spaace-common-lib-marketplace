import { FieldPath, Firestore, Timestamp } from '@google-cloud/firestore';
import { Season } from './entity';

class FirestoreClient {
  private readonly firestore: Firestore;

  constructor() {
    this.firestore = new Firestore({
      projectId: process.env.FIRESTORE_PROJECT_ID,
    });
  }

  public async initialize() {
    // TODO: Pre-fetch current season in cache
  }

  public async getSeason(number: number): Promise<Season | null> {
    const seasons = await this.firestore
      .collection('seasons')
      .doc(number.toString())
      .get();

    if (!seasons.exists) return null;

    return seasons.data() as Season;
  }

  public async getCurrentSeason(now?: Timestamp): Promise<Season | null> {
    if (now === undefined) now = Timestamp.now();

    const snapshot = await this.firestore
      .collection('seasons')
      .where('startDate', '<=', now)
      .where('endDate', '>', now)
      .orderBy(FieldPath.documentId(), 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as Season;
  }
}

export default new FirestoreClient();
