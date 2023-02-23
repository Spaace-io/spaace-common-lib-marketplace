import PubSubClient from './client';
import { Topics } from './types';

async function main() {
  await PubSubClient.init();

  await PubSubClient.publish(Topics.EVENT, 'Hello world!');
}

main();
