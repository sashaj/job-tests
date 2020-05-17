const form = document.querySelector('#configurator');
const loadingText = document.querySelector('.loading');
const submitButton = document.querySelector('.submit');
const resultWrapper = document.querySelector('.result');
const configWrapper = document.querySelector('.config');
const complectWrapper = document.querySelector('.complect');

function printGroupTemplate(title) {
  const groupTemplate = `<div class="group__wrapper display-none">
            <h4 class="group__title">${title}</h4>      
          </div>`;
  form.insertAdjacentHTML('beforeend', groupTemplate);
}

function printItemTemplate(id, text, index, codes, description, add, bundle) {
  const groupWrapper = document.querySelectorAll('.group__wrapper');
  const itemTemplate = `
            <div class="input__wrapper">
              <input 
                class="input__radio" 
                type="radio" 
                id="${codes[index] + id}"
                name="${codes[index]}" 
                value="${text}" 
                ${typeof add === 'boolean' ? `data-add='${add}'` : ''}
                data-bundle="${bundle ? bundle : false}">
              <label for="${codes[index] + id}">${text}</label>
              ${description ? `<span>-${description} </span>` : ''}             
            </div>`;
  groupWrapper[index].insertAdjacentHTML('beforeend', itemTemplate);
}

function printConfigTemplate(config, index) {
  configWrapper.insertAdjacentHTML('beforeend', config + ', ');
}
function printComplectTemplate(complect, index) {
  complectWrapper.insertAdjacentHTML('beforeend', complect + ', ');
}

function handleProduct(data) {
  const codes = [];
  data.forEach((elem, index) => {
    codes.push(elem.code);
    printGroupTemplate(elem.title);
    elem.config.forEach(item => {
      printItemTemplate(item.id, item.text, index, codes, item.extend, item.add, item.bundle);
    });
  });
}

function handleSubmit() {
  const inputs = document.querySelectorAll('.input__radio');
  const config = [];
  const complect = [];
  const result = [];

  form.classList.add('display-none');
  submitButton.classList.add('display-none');
  resultWrapper.classList.remove('display-none');

  inputs.forEach(item => {
    if (item.checked && typeof item.dataset.add === 'undefined') {
      config.push(item.value);
    }
    if (item.checked && item.dataset.add === 'true') {
      complect.push(item.value);
    }
  });
  config.forEach((item, index) => {
    printConfigTemplate(item, index);
  });
  complect.forEach((item, index) => {
    printComplectTemplate(item, index);
  });
}

function stepLogic() {
  document.querySelectorAll('.group__wrapper')[0].classList.remove('display-none');
  form.addEventListener('input', event => {
    event.target.parentElement.parentElement.classList.add('display-none');
    if (event.target.parentElement.parentElement.nextElementSibling) {
      event.target.parentElement.parentElement.nextElementSibling.classList.remove('display-none');
    }
  });
}

function getData() {
  const url = 'https://cors-anywhere.herokuapp.com/https://www.iport.ru/upload/front/data.json';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (form) {
        loadingText.classList.add('display-none');
        submitButton.classList.remove('display-none');
        handleProduct(data);
      }
    })
    .then(() => {
      stepLogic();
    })
    .catch(error => {
      throw new Error(error);
    });
}
getData();

submitButton.addEventListener('click', event => {
  event.preventDefault();
  handleSubmit();
});
