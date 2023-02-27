import FirestoreClient from './client';
import { RuleProperty, RuleOperator } from './types';
import { Season } from './types/grind';

/* This is a test code only, for retrieving a doc during development phase
   Use the following command to run this code:
   npm run dev:firestore
*/
const main = async () => {
  const newSeason = await FirestoreClient.collection('seasons').add({
    name: 'Welcome to Spaace',
    number: 1,
    startDate: new Date(),
    grinds: [
      {
        rule: {
          property: RuleProperty.LISTED,
          operator: RuleOperator.GTE,
          value: 1,
        },
        rewards: [
          {
            stakingBonus: 0.1,
          },
        ],
      },
    ],
  });

  const doc = (
    await FirestoreClient.collection('seasons').doc(newSeason.id).get()
  ).data() as Season | undefined;

  return doc;
};

main().then((data) => console.log(data));
