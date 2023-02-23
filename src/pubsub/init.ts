import PubSubClient from './client';
import { Topics } from './types';

/* This is a test code only, for sending messages during development phase
   Use the following command to run this code:
   npm run dev:pubsub
*/
async function main() {
  await PubSubClient.init();
  await PubSubClient.publish(Topics.EVENT, 'Hello world!');
}

main();
