import REST from './REST'

class Kitten extends REST {
  constructor(obj) {
    super(obj);
    Object.assign(this, obj)
  }
}
