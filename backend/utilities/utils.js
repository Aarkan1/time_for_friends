module.exports = function validatePerson(s) {
  const valName = s.name && s.name.trim().length > 0;
  const valCity = s.city && s.city.trim().length > 0;
  const valWorks = s.works && s.works.trim().length > 0;
  const valSleeps = s.sleeps && s.sleeps.trim().length > 0;

  
  const valPhone = (s.phoneNumbers && !s.phoneNumbers.map((m, i) => {
    if(m.length < 10 || m.length > 16) {
      return i;
    } 
    return undefined;
  }).filter(m => m !== undefined).length > 0);

  const valEmail = (s.mailAddresses && !s.mailAddresses.map((m, i) => {
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(m)) {
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

  return valName && valWorks && valSleeps && valCity && valPhone && valEmail && valWorkSleep;
}