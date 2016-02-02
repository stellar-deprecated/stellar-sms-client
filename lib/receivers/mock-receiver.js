import {Promise} from 'stex';
import Message from '../message'
import Receiver from './receiver';

export default class MockReceiver extends Receiver {
  parse(rawMessage) {
    return new Message('+10000000000', rawMessage);
  }
}
