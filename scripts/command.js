import Stex, {Promise} from 'stex';
import CommandParser from '../lib/command-parser';

if (!process.argv[4]) {
  console.log('Usage: stex run command [command]');
  process.exit();
}

let commandText = process.argv.slice(4).join(' ');
let message = stex.sms.receiver.parse(commandText);
let command = CommandParser.parse(message);
command.run();
