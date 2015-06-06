import {Promise} from 'stex';
import Sender from './sender';
import Twilio from 'twilio';

export default class TwilioSender extends Sender {
  constructor(data) {
    super(data);
    this.twilio = new Twilio.RestClient(data.accountSID, data.authToken);
    this.fromNumber = data.number;
  }

  sendMessage(to, body) {
    return new Promise((resolve, reject) => {
      let from = this.fromNumber;
      this.twilio.sendMessage({to, from, body})
        .then(response => {
          resolve(response);
        }).fail(error => {
          reject(error);
        });
    });
  }
}
