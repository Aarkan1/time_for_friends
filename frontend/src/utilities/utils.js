import React from "react";
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

export function availabilityIcon(friend) {
  if(!friend.works && !friend.sleeps) return;

  let [workStart, workEnd] = friend.works.split('-');
  let [sleepStart, sleepEnd] = friend.sleeps.split('-');
  const localeHour = new Date(Date.now() + friend.timeOffset).getHours();

  const isWorking = workStart < localeHour && workEnd > localeHour;
  const isSleeping = sleepEnd > localeHour || sleepStart < localeHour;

  return (isWorking ? <i className="material-icons right">emoji_transportation</i> 
        : isSleeping ? <i className="material-icons right">snooze</i> 
        : <i className="material-icons right">mood</i>)
} 