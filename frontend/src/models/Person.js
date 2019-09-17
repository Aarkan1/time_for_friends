import Rest from './Rest'
import timezones from '../utilities/timezones.json'

export default class Person extends Rest {
  constructor(obj) {
    super(obj);
    let timeOffset = timezones[obj.timezone]
    timeOffset = timeOffset.match(/\(GMT([+-]\d+:\d+)\)/)[0].replace(/[()GMT]/g, '')
    timeOffset = timeOffset.split(':')
    // convert to offset in milliseconds
    timeOffset = ((parseInt(timeOffset[0]) * 60 * 60 * 1000) + (parseInt(timeOffset[0]) * 60 * 1000))

    Object.assign(this, obj, {timeOffset})
  }
}
