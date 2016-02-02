import {SendCommand, BalanceCommand} from './commands';

export default class CommandParser {
  static parse(message) {
    let from = message.from;
    let data = message.data.split(' ');
    let [command] = data;

    switch (command) {
      case 'send':
        let [,to,amount] = data;
        return new SendCommand(from, to, amount);
        break;
      case 'balance':
        return new BalanceCommand(from);
        break;
      default:
        throw new Error('Unknown command');
        break;
    }
  }
}
