import Rest from './Rest'

export default class Person extends Rest {
  constructor(obj) {
    super(obj);
    let defaultObject = {
      name: "Bertil Arnesson",
      phonenumbers: ['123-123123', '321-321321'],
      mailaddresses: ['bertil@nogot.com', 'superarne@msn.se'],
      city: "Malmö",
      country: "Sweden",
      timezone: "GMT+2",
      sleeps: "22:00-6:00",
      works: "8:00-16:00"
    }

    Object.assign(this, obj)
  }
}
