export default class Message {
  constructor(from, data) {
    this._from = from;
    this._data = data;
  }

  get from() {
    return this._from;
  }

  get data() {
    return this._data;
  }
}
