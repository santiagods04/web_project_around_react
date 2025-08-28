class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  _checkResponse(res) {
    if (!res.ok) return Promise.reject(`Error ${res.status}`);
    return res.text().then(t => (t ? JSON.parse(t) : {}));
  }

  renderLoading(isLoading, buttonSelector) {
    const button = document.querySelector(buttonSelector);
    if (isLoading && button.id === "popupS__btn") {
      button.textContent = "Creando...";
    } else if (isLoading) {
      button.textContent = "Guardando...";
    } else if (button.id === "popupS__btn") {
      button.textContent = "Crear";
    } else {
      button.textContent = "Guardar";
    }
  }

  getInfoUser(){
    return fetch(`${this._url}/users/me`,{
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
    .catch(err => console.log('Error al cargar el usuario:', err));
  }

  getInitialCards(){
    return fetch(`${this._url}/cards/`,{
      cache: "no-store",
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  updateUserInfo({name, job}){
    return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      },
       body: JSON.stringify({
        name: name,
        about: job})
    })
    .then(this._checkResponse)
  }

  newCard({name, link}){
    return fetch(`${this._url}/cards/`,{
      method: 'POST',
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
    .catch(err => console.log('Error al actualizar usuario:', err))
  }

  handleLikeCard(cardId, isLiked){
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
    
  }

  handleDeleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`,{
      method: 'DELETE',
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  updateAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`,{
      method: 'PATCH',
      headers: {
        authorization: this._token, 'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api('https://around-api.es.tripleten-services.com/v1', '28175fc1-f081-4f3f-9a2f-2da0605eb1a7');
export default api ;