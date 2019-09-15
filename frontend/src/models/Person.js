import Rest from './Rest'

export default class Person extends Rest {
  constructor(obj) {
    super(obj);
    Object.assign(this, obj)
  }
}
