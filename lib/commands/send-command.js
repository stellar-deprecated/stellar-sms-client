import {Account, Currency, Keypair, Operation, TransactionBuilder} from 'js-stellar-lib';
import request from 'superagent';

export class SendCommand {
  constructor(from, to, amount) {
    this._from = from;
    this._to = to;
    this._amount = amount;
  }

  run() {
    let keypair = Keypair.fromSeed(stex.conf.get('testAccountSeed'));
    let destinationAddress = '';

    request
      .get(`https://api.stellar.org/federation?destination=${this._to}&domain=stellar.org`)
      .type('json')
      .send()
      .end((err, res) => {
        stex.horizon.loadAccount(keypair.address())
          .then(account => {
            console.log('Account loaded.');
            let currency = Currency.native();
            let amount = this._amount * 1000000;
            let transaction = new TransactionBuilder(account)
              .addOperation(Operation.payment({
                destination: res.body.federation_json.destination_new_address,
                currency: currency,
                amount: amount
              }))
              .addSigner(keypair)
              .build();

            stex.horizon.submitTransaction(transaction)
              .then(transactionResult => {
                console.log(transactionResult);
                stex.sms.sender.sendMessage(this._from, 'Transaction sent!');
              })
              .catch(e => {
                console.error(e);
                stex.sms.sender.sendMessage(this._from, 'Error sending transaction!');
              });
          });
      });
  }
}
