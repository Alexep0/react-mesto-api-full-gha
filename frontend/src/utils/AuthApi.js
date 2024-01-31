export default class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. ${res.statusText}`);
  }

  register({ email, password }) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: this._headers
    }).then(this._getData);
  }

  login({ email, password }) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: this._headers
    }).then(this._getData);
  }

  checkToken( token ) {
    return fetch(this._baseUrl + "/users/me", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(this._getData);
  }
}

export const authApi = new AuthApi({
  baseUrl: 'https://api.alexep0.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
