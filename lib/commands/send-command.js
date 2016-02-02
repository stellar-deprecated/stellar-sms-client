import {Account, Asset, Keypair, Operation, TransactionBuilder} from 'stellar-sdk';
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
        stex.horizon.loadAccount(keypair.accountId())
          .then(account => {
            console.log('Account loaded.');
            let asset = Asset.native();
            let amount = this._amount;
            let transaction = new TransactionBuilder(account)
              .addOperation(Operation.payment({
                destination: res.body.federation_json.destination_new_address,
                asset: asset,
                amount: amount
              }))
              .build();

            transaction.sign(keypair);

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
