import Rest from './Rest'
import moment from 'moment-timezone';

export default class Person extends Rest {
  constructor(obj) {
    super(obj);
    let timeOffset = moment().tz(obj.timezone).utcOffset() * 60 * 1000
    Object.assign(this, obj, {timeOffset})
  }
}
