// IE11 Polyfill forEach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
//=include partials/form.js

const inputClosers = document.querySelectorAll('.input-close');
const iconCubes = document.querySelectorAll('.icon-cubes');
const posts = document.querySelectorAll('.post');
const infoItems = document.querySelectorAll('.info__list li');
const modal = document.querySelector('.modal');
const modalCloser = document.querySelector('.close-round');
const modalHyperlink = document.querySelector('.modal .hyperlink');

if (validateSelectors(inputClosers)) {
  inputClosers.forEach(item => {
    item.addEventListener('click', function() {
      this.parentElement.firstChild.value = '';
      this.parentElement.classList.remove('not-empty', 'error');
    });
  });
}

if (validateSelectors(iconCubes, posts)) {
  iconCubes.forEach((item, index) => {
    item.addEventListener('click', function() {
      posts[index].classList.toggle('open');
    });
  });
}

if (validateSelectors(infoItems, modal)) {
  infoItems.forEach(item => {
    item.addEventListener('click', function() {
      modal.classList.add('active');
    });
  });
}

if (validateSelectors(modalCloser, modal)) {
  modalCloser.addEventListener('click', function() {
    modal.classList.remove('active');
  });
}

if (validateSelectors(modalHyperlink, modal)) {
  modalHyperlink.addEventListener('click', function() {
    modal.classList.remove('active');
  });
}
