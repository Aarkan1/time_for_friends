let type;

export default class Rest {
  constructor(obj) {
    type = this.constructor.name;
    Object.assign(this, obj);
  }

  static async findOne(query = {}, options = {}) {
    const id = query._id;
    query = typeof query === 'object' ? query : { _id: query }
    
    query = encodeURIComponent(JSON.stringify(query, (key, val) =>
    val.constructor === RegExp ?
      { $regex: val.toString() } : val));
    options = encodeURIComponent(JSON.stringify(options));
    
    let result = await customGet(`/rest/${type || this.name}/${id ? id : this._id}?q=${query}&o=${options}`);
    let model = new this(result)
    delete model.__v;
    return model
  }

  static async find(query = {}, options = {}) {
    query = encodeURIComponent(JSON.stringify(query, (key, val) =>
    val.constructor === RegExp ?
      { $regex: val.toString() } : val));
    options = encodeURIComponent(JSON.stringify(options));

    let results = await customGet(`/rest/${type || this.name}?q=${query}&o=${options}`); 
    results = results.results;
    
    return results.map(result => {
      let model = new this(result)
      delete model.__v;
      return model
    })
  }

  async save() {
    return this._id ? await customPut(`/rest/${type || this.name}`, this) 
             : await customPost(`/rest/${type || this.name}`, this);
  }

  async delete() {
    return await customDelete(`/rest/${type || this.name}/${this._id}`)
  }
}

function customGet(url) {         return customFetch('GET', url)}
function customPost(url, body) {  return customFetch('POST', url, body)}
function customPut(url, body) {   return customFetch('PUT', url, body)}
function customDelete(url) {      return customFetch('DELETE', url)}

async function customFetch(method, url, body) {
  let res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  });
  return await res.json();
}
