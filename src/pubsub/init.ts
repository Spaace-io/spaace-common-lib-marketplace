import PubSubClient from './client';
import { PubSubEvents, PubSubTopics } from './types';

/* This is a test code only, for sending messages during development phase
   Use the following command to run this code:
   npm run dev:pubsub
*/
async function main() {
  await PubSubClient.initialize();
  await PubSubClient.publish(PubSubTopics.EVENT, {
    event: PubSubEvents.GREETING,
    data: 'Hello World',
  });
}

main();
