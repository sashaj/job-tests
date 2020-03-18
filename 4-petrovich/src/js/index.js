window.onload = function() {
  const submitButton = document.querySelector('.form__submit');
  const inputEmail = document.querySelector('.form-input__email input');
  const inputPassword = document.querySelector('.form-input__password input');
  const form = document.querySelector('.form');
  const formError = document.querySelector('.form__error');
  const formWrapper = document.querySelector('.form__wrapper');

  function showError(message) {
    if (message) {
      formError.innerHTML = `Ошибка: ${message}`;
    }
  }

  function validateEmail(inputText) {
    const mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailformat.test(inputText);
  }

  function validatePassword(inputText) {
    if (inputText.length > 3) {
      inputPassword.focus();
      return true;
    }
    return false;
  }

  function postForm() {
    const url = 'http://test.kluatr.ru/api/user/login';
    const data = new FormData(form);
    fetch(url, {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success == false) {
          showError(data.error);
        } else {
          getPoints();
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  function getPoints() {
    const url = 'http://test.kluatr.ru/api/user/data';
    fetch(url, {
      credentials: 'include',
    })
      .then(response => response.json())
      .catch(error => {
        showError('что-то пошло не так');
        throw new Error(error);
      })
      .then(data => showPoints(data));
  }

  function showPoints(data) {
    formWrapper.innerHTML = '';
    Object.entries(data.data).forEach(([key, value]) => {
      formWrapper.insertAdjacentHTML('beforeend', `<p class="bonus__entry"> ${key} : ${value}</p>`);
    });
  }

  submitButton.addEventListener('click', event => {
    event.preventDefault();
    if (validateEmail(inputEmail.value) && validatePassword(inputPassword.value)) {
      postForm();
      showError(false);
    } else {
      showError('Email или пароль введены неправильно');
    }
  });
};
