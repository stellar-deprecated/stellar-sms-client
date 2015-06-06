export default class Receiver {
  constructor() {}

  parse(rawMessage) {
    throw new Error('This class is abstract.');
  }
}
