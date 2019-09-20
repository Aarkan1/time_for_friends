import moment from 'moment-timezone'

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// help function for checking if timezone uses DST
export function getDSToffset(tz) {
  var janOffset = moment.tz({month: 0, day: 1}, tz).utcOffset();
  var junOffset = moment.tz({month: 5, day: 1}, tz).utcOffset();
  return Math.abs(junOffset - janOffset);
}
