import {Promise} from 'stex';
import Sender from './sender';

export default class MockSender extends Sender {
  sendMessage(to, body) {
    return new Promise(resolve => {
      console.log(`Sent message: "${body}" to: ${to}`);
      resolve();
    });
  }
}
