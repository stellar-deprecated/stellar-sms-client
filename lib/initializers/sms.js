import Stex from "stex";
import Initializer from "stex/lib/initializer";

Initializer.add('startup', 'sms', ['stex.config'], function(stex) {
  let smsConfig = stex.conf.get('sms');
  let Sender = require(`../senders/${smsConfig.sender.name}-sender`);
  let Receiver = require(`../receivers/${smsConfig.receiver.name}-receiver`);

  stex.sms = {
    sender:   new Sender(smsConfig.sender),
    receiver: new Receiver(smsConfig.receiver)
  };
});
