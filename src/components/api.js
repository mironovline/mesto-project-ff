const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '2f1d2ec8-7302-4076-abbc-c533d5817ed0',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then(
      (error) => {
        error.httpStatusCode = res.status;
        return Promise.reject(error);
      }
    );
};

export const getCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
})
.then(checkResponse)
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse)
  
};

export const patchProfile = (nameUser, aboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser
    })
  })
  .then(checkResponse)
};

export const postCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
})
  .then(checkResponse)
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
};

export const toggleLikePromise = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}
