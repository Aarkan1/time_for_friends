class REST {
  constructor(obj) {
    this.type = this.constructor.name
    Object.assign(this, obj)
  }

  static async findOne(query = {}) {
    const id = query._id;
    if(typeof query === 'string') {
      query = { _id: query }
    }
    query = encodeURIComponent(JSON.stringify(query));
    
    let result = await customGet(`/rest/${this.type || this.name}/${id ? id : this._id}?q=${query}`);
    return new this(result)
  }

  static async find(query = {}) {
    query = encodeURIComponent(JSON.stringify(query));

    let results = await customGet(`/rest/${this.type || this.name}?q=${query}`); 
    results = results.results;
    
    return results.map(result => new this(result))
  }

  async save() {
    this._id ? await customPut(`/rest/${this.type || this.name}`, this) 
             : await customPost(`/rest/${this.type || this.name}`, this);
    return this
  }

  async delete() {
    return await customDelete(`/rest/${this.type || this.name}/${this._id}`)
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
