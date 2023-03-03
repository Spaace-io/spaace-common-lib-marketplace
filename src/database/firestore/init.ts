import FirestoreClient from './client';

/* This is a test code only, for retrieving a doc during development phase
   Use the following command to run this code:
   npm run dev:firestore
*/
const main = async () => {
  await FirestoreClient.initialize();

  const season = await FirestoreClient.getCurrentSeason();

  if (!season) {
    console.log('No season found');
    return;
  }

  console.log('Current season:', season);
};

main();
