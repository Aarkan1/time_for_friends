import REST from './REST'

class Person extends REST {
  constructor(obj) {
    super(obj);
    this.kittens = [];
    Object.assign(this, obj)
  }
}
