import Rest from './Rest'

export default class Person extends Rest {
  constructor(obj) {
    super(obj);
    this.kittens = [];
    Object.assign(this, obj)
  }
}
