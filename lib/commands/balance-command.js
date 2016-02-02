import {Account, Currency, Keypair, Operation, TransactionBuilder} from 'stellar-sdk';
import {isArray, forEach} from 'lodash';

export class BalanceCommand {
  constructor(from) {
    this._from = from;
  }

  run() {
    let keypair = Keypair.fromSeed(stex.conf.get('testAccountSeed'));

    stex.horizon.accounts().accountId(keypair.accountId())
      .call()
      .then(account => {
        let response = "Balances: ";

        if (!(isArray(account.balances) && account.balances.length > 0)) {
          account.balances = [{balance: 0, asset_code: 'XLM'}];
        }

        forEach(account.balances, asset => {
          if (asset.asset_type === 'native') {
            response += `XLM: ${asset.balance} `;
          } else {
            response += `${asset.asset_code}: ${asset.balance} `;
          }
        });

        stex.sms.sender.sendMessage(this._from, response.trim());
      })
      .catch(e => {
        stex.sms.sender.sendMessage(this._from, "Error getting account info.");
      });
  }
}
