const API_URL = 'https://26.javascript.pages.academy/kekstagram';

function getPosts(onSuccess, onError) {
  fetch(`${API_URL}/data`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Не удалось загрузить данные');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error.message, true);
    });
}

function sendForm(onSuccess, onFail, body) {
  fetch(API_URL, {
    method: 'POST',
    body
  })
    .then((res) => {
      if (res.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить форму');
      }
    })
    .catch((error) => {
      onFail(error.message);
    });
}

export { getPosts, sendForm };
