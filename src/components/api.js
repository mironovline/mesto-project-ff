const token = '2f1d2ec8-7302-4076-abbc-c533d5817ed0';

export const getCard = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/cards', {
    method: 'GET',
    headers: {
    authorization: token
  }
})
.then((res) => {
  return res.json();
})
.catch((err) => {
    console.log(err);
  })
};

export const getProfile = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  })
};

export const patchProfile = (nameUser, aboutUser) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token
    },
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser
    })
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => {
    console.log(err);
  })
}



// export const postCard = (data) => {
//   fetch('https://nomoreparties.co/v1/cohort-42/cards', {
//     method: 'POST',
//     headers: {
//     authorization: '2f1d2ec8-7302-4076-abbc-c533d5817ed0',
//     'Content-Type': 'application/json'
//   },
//     body: JSON.stringify(data)
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };


// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return res.json()
//     .then(
//       (error) => {
//         error.httpStatusCode = res.status;
//         return Promise.reject(error);
//       }
//     );
// }