import Rest from './Rest'

export default class Kitten extends Rest {
  constructor(obj) {
    super(obj);
    Object.assign(this, obj)
  }
}
