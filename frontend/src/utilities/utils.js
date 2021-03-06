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

  return (isWorking ? <i className="material-icons yellow-text text-darken-3 right">emoji_transportation</i> 
        : isSleeping ? <i className="material-icons red-text text-darken-2 right">snooze</i> 
        : <i className="material-icons green-text text-darken-2 right">mood</i>);
} 

export function validateForm(s) {
  !s.name.trim().length && document.querySelector('#friend-name').classList.add("validate-error");
  const valName = s.name.trim().length > 0;
  
  !s.city.trim().length && document.querySelector('#friend-city').classList.add("validate-error");
  const valCity = s.city.trim().length > 0;
  
  const valPhone = (!s.phoneNumbers.map((m, i) => {
    if(m.length < 10 || m.length > 16) {
      document.querySelector('.friend-phone-' + i).classList.add("validate-error");
      return i;
    } 
    return undefined;
  }).filter(m => m !== undefined).length > 0);

  const valEmail = (!s.mailAddresses.map((m, i) => {
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(m)) {
      document.querySelector('.friend-email-' + i).classList.add("validate-error");
      return i;
    } 
    return undefined;
  }).filter(m => m !== undefined).length > 0);

  // extract work and sleep time
  // and convert values to numbers 
  // for number comparison
  let [workStart, workEnd] = s.works.split('-');
  let [sleepStart, sleepEnd] = s.sleeps.split('-');
  workStart = workStart / 1;
  workEnd = workEnd / 1;
  sleepStart = sleepStart / 1;
  sleepEnd = sleepEnd / 1;

  const valWorkSleep = (workStart > sleepEnd) && (workEnd < sleepStart);
  !valWorkSleep && document.querySelector('#work-sleep-sliders').classList.add("validate-error");
  
  return valName && valCity && valPhone && valEmail && valWorkSleep;
}