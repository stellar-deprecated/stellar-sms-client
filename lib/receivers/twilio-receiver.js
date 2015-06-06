import {Promise} from 'stex';
import Message from '../message'
import Receiver from './receiver';
import Twilio from 'twilio';
import querystring from 'querystring';

export default class TwilioReceiver extends Receiver {
  parse(rawMessage) {
    var data = querystring.parse(rawMessage);
    return new Message(data.From, data.Body);
  }
}
