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

  return valName && valWorks && valSleeps && valCity && valPhone && valEmail;
}