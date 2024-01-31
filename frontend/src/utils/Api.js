export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _fetchData(url, config) {
    const newConfig = {
      ...config, headers: {
        ...this._headers,
        ...config.headers,
        Authorization: "Bearer " + localStorage.getItem('jwt')
      }
    }
    return fetch(url, newConfig).then(this._getData)
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. ${res.statusText}`);
  }

  getInitialCards() {
    return this._fetchData(this._baseUrl + `/cards`, {
      headers: this._headers,
    });
  }

  setUserInfo(body) {
    return this._fetchData(this._baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
      // {name: "asd", about: "asd"}
    });
  }

  getUserInfo() {
    return this._fetchData(this._baseUrl + `/users/me`, {
      headers: this._headers,
    });
  }

  addNewCard(body) {
    return this._fetchData(this._baseUrl + `/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
      // {name: "asd", link: "asd"}
    });
  }

  deleteCard(id) {
    return this._fetchData(this._baseUrl + `/cards/` + id, {
      method: 'DELETE',
      headers: this._headers,
      // {name: "asd", link: "asd"}
    });
  }

  likeCard(id) {
    return this._fetchData(this._baseUrl + `/cards/` + id + '/likes', {
      method: 'PUT',
      headers: this._headers,

    });
  }

  removeLikeCard(id) {
    return this._fetchData(this._baseUrl + `/cards/` + id + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  setUserAvatar(avatar) {
    return this._fetchData(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    });
  }
}

export const api = new Api({
  baseUrl: 'https://api.alexep0.nomoredomainsmonster.ru',
  headers: {
    Authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
}); 
