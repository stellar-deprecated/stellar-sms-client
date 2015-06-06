import CommandParser from '../command-parser';

export default function(req, res, next) {
  let message = stex.sms.receiver.parse(req.rawBody);
  let command = CommandParser.parse(message);
  command.run();

  // Return empty response for Twilio. We could send a message using
  // TwiML but we want to separate `sender` and `receiver`.
  res.status(200).send('<Response></Response>');
};
