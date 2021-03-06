export class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _parseResult(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    getUserProfile() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    setUserProfile(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
    addNewCard(data, userId) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data, userId),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    newAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(res => {
          return this._parseResult(res)
        })
  
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    likeCard(id, isLiked) {
      if(isLiked) {
       return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
  } else {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  }
}
  
  
   const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
      authorization: '4878297e-a5d0-4926-bd68-79ebe47e3cfd',
      "Content-Type": "application/json",
    },
  }
  )
  
  export default api;