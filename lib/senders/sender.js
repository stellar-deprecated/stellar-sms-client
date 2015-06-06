export default class Sender {
  constructor() {}

  send(to, message) {
    throw new Error('This class is abstract.');
  }
}
