const userEmail = document.querySelector('#user-email');
const userName = document.querySelector('#user-name');
const userCountry = document.querySelector('#user-country');
const userTerms = document.querySelector("input[name='user-terms']");
const submitButton = document.querySelector('.button-submit');
const formInputs = document.querySelectorAll('#request-form input');
const termsWrapper = document.querySelector('.form__input-checkbox');
const requestForm = document.querySelector('#request-form');
const mailPattern = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
const namePattern = /^(([A-Za-z]+(?:[ |-]{1}[A-Za-z]+)*$)|([А-Яа-я]+(?:[|-]{1}[А-Яа-я]+)*$))/;

function validateRegex(element, pattern) {
  return pattern.test(element);
}

function validateSelect(select) {
  return !select.selectedIndex == 0;
}

function validateCheckbox(checkbox) {
  return checkbox.checked;
}

function classToggle(element, className, turnOn) {
  if (!element.classList.contains(className) && turnOn) {
    element.classList.add(className);
  } else if (element.classList.contains(className) && !turnOn) {
    element.classList.remove(className);
  }
}

function validateSelectors(...args) {
  let sum = 0;
  args.forEach(item => {
    if (item) sum++;
  });
  return sum == args.length;
}

function inputErrorHandler(validate, elem, className) {
  if (validate) {
    classToggle(elem, className, false);
  } else if (!validate) {
    classToggle(elem, className, true);
  }
}

function selectCountryErrorHandler() {
  if (!validateSelect(userCountry)) {
    classToggle(userCountry.parentElement, 'error', true);
  } else if (validateSelectors(userCountry)) {
    classToggle(userCountry.parentElement, 'error', false);
    classToggle(userCountry.parentElement, 'selected', true);
  }
}

function submitHandler() {
  submitButton.addEventListener('click', event => {
    event.preventDefault();
    inputErrorHandler(validateRegex(userName.value, namePattern), userName.parentElement, 'error');
    inputErrorHandler(validateRegex(userEmail.value, mailPattern), userEmail.parentElement, 'error');
    inputErrorHandler(validateCheckbox(userTerms), termsWrapper, 'error');
    selectCountryErrorHandler();
    if (
      validateRegex(userEmail.value, mailPattern) &&
      validateRegex(userName.value, namePattern) &&
      validateSelect(userCountry) &&
      validateCheckbox(userTerms)
    ) {
      alert('form validated');
    }
  });
}
if (validateSelectors(submitButton, userEmail, userName, userCountry, userTerms)) {
  submitHandler();
}

function inputsNotEmptyHandler(elem) {
  if (elem.value.length > 0) {
    classToggle(elem.parentElement, 'not-empty', true);
  } else if (elem.value.length === 0) {
    classToggle(elem.parentElement, 'not-empty', false);
  }
}

function formEventDelegator() {
  requestForm.addEventListener('input', event => {
    switch (event.target.id) {
      case 'user-email':
        inputErrorHandler(validateRegex(userEmail.value, mailPattern), userEmail.parentElement, 'error');
        inputsNotEmptyHandler(event.target);
        break;
      case 'user-name':
        inputErrorHandler(validateRegex(userName.value, namePattern), userName.parentElement, 'error');
        inputsNotEmptyHandler(event.target);
        break;
      case 'user-terms':
        inputErrorHandler(validateCheckbox(userTerms), termsWrapper, 'error');
        break;
      case 'user-country':
        selectCountryErrorHandler();
        break;
    }
  });
}
if (validateSelectors(formInputs, userName, userEmail, userTerms, userCountry)) {
  formEventDelegator();
}
