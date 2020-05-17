document.addEventListener('DOMContentLoaded', event => {
  const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 400);
  const buttonUp = document.querySelector('.button-up');
  let toggler;

  function menuHandler() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const closer = document.querySelector('.menu__closer');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        menu.classList.add('active');
        switchOverflow(open);
      });
    }
    if (closer) {
      closer.addEventListener('click', () => {
        menu.classList.remove('active');
        switchOverflow(false);
      });
    }
    window.onclick = event => {
      if (event.target === menu) {
        menu.classList.remove('active');
        switchOverflow(false);
      }
    };
  }
  menuHandler();

  function scrollListener() {
    let scrollPosition = 0;
    let ticking = false;
    window.addEventListener('scroll', e => {
      scrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          buttonUpHider(scrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  scrollListener();

  function buttonUpHider(scrollPosition) {
    if (buttonUp) {
      if (scrollPosition > viewportHeight / 2) {
        buttonUp.classList.remove('display-none');
      } else {
        buttonUp.classList.add('display-none');
      }
    }
  }

  function buttonUpHandler() {
    if (buttonUp) {
      buttonUp.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }
  buttonUpHandler();

  function starHandler() {
    const stars = document.querySelectorAll('.item__star');
    if (stars) {
      for (const i of stars) {
        i.addEventListener('click', function () {
          this.closest('.item').setAttribute(
            'data-fav',
            this.closest('.item').getAttribute('data-fav') === '0' ? '1' : '0',
          );
        });
      }
    }
  }
  starHandler();

  function switchOverflow(open) {
    if (open) {
      document.querySelector('body').classList.add('freezePage');
    } else {
      document.querySelector('body').classList.remove('freezePage');
    }
  }

  function submitButtonHandler() {
    const form = document.querySelector('.subscribe-form');
    const submitButton = document.querySelector('.subscribe-form__submit');
    const email = document.querySelector('.subscribe-form__email');
    if (submitButton) {
      submitButton.addEventListener('click', () => {
        submitForm(form, email);
      });
    }
  }
  submitButtonHandler();

  function submitForm(form, email) {
    if (emailValidation(email.value)) {
      email.classList.remove('error');
    } else {
      email.classList.add('error');
    }
  }

  function emailValidation(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setPrice() {
    const items = document.querySelectorAll('.item__price');
    if (items) {
      for (const i of items) {
        const price = i.innerText.replace(/\D+/g, '');
        i.closest('.item').setAttribute('data-price', price);
      }
    }
  }
  setPrice();

  function setRooms() {
    const items = document.querySelectorAll('.item__name');
    if (items) {
      for (const i of items) {
        if (i.innerText.includes('Студия')) {
          i.closest('.item').setAttribute('data-rooms', '0');
        }
        if (i.innerText.includes('Однокомнатная')) {
          i.closest('.item').setAttribute('data-rooms', '1');
        }
        if (i.innerText.includes('Двухкомнатная')) {
          i.closest('.item').setAttribute('data-rooms', '2');
        }
        if (i.innerText.includes('Трехкомнатная')) {
          i.closest('.item').setAttribute('data-rooms', '3');
        }
        if (i.innerText.includes('Четырехкомнатная')) {
          i.closest('.item').setAttribute('data-rooms', '4');
        }
      }
    }
  }
  setRooms();

  function sort(data) {
    const wrapper = document.querySelector('.results__content');
    const children = [...wrapper.children];
    if (toggler) {
      children.sort((a, b) => +a.getAttribute(data) - +b.getAttribute(data)).map(node => wrapper.appendChild(node));
      toggler = false;
    } else {
      children.sort((a, b) => +b.getAttribute(data) - +a.getAttribute(data)).map(node => wrapper.appendChild(node));
      toggler = true;
    }
  }

  function priceButtonHandler() {
    const priceButton = document.querySelector('.sorting__item-price');
    if (priceButton) {
      const attr = 'data-price';
      priceButton.addEventListener('click', () => {
        sort(attr);
        priceButton.classList.toggle('active');
      });
    }
  }
  priceButtonHandler();

  function roomButtonHandler() {
    const roomButton = document.querySelector('.sorting__item-rooms');
    if (roomButton) {
      const attr = 'data-rooms';
      roomButton.addEventListener('click', () => {
        sort(attr);
        roomButton.classList.toggle('active');
      });
    }
  }
  roomButtonHandler();

  function showMoreButtonHandler() {
    const wrapper = document.querySelector('.results__content');
    const showButton = document.querySelector('.show-more');
    let loader = true;
    if (showButton) {
      showButton.addEventListener('click', () => {
        if (loader) {
          fetch(new Request('../../items.json'), {
              mode: 'no-cors',
            })
            .then(response => response.json())
            .then(data => {
              const itemsFromJson = data.items.map(itemTemplate).join('');
              wrapper.insertAdjacentHTML('beforeend', itemsFromJson);
              loader = false;
              setPrice();
              setRooms();
            }).catch(error => {
              // fetch is unable to load local files, this is a polyfill
              const itemsFromJson = itemsArray.map(itemTemplate).join('');
              wrapper.insertAdjacentHTML('beforeend', itemsFromJson);
              loader = false;
              setPrice();
              setRooms();
              throw new Error(error);
            });
        }
        setTimeout(unHideItems, 100);
      });
    }
  }
  showMoreButtonHandler();

  function unHideItems() {
    const hiddenItems = document.querySelectorAll('.results__content .item.display-none');

    if (hiddenItems.length > 0) {
      for (const i of hiddenItems) {
        i.classList.remove('display-none');
      }
    } else {
      document.querySelector('.show-more').classList.add('display-none');
    }
  }

  function itemTemplate(item) {
    return `
    <div class="item display-none ${item.class}">
        <div class="item__content">
          <div class="item__header">
            <div class="item__labels">
              <div class="item__discount">-6%</div>
              <div class="item__star"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847 1058.8"><path d="M534 310c385 17 369-31 68 209 102 370 142 341-178 130-323 213-281 244-179-130-302-241-318-192 69-209 134-359 85-359 220 0z"></path></svg>

              </div>
            </div>
          </div>
          <div class="item__body">
            <div class="item__img"><img src="${item.src}"></div><span class="item__name">${item.name}</span>
            <div class="item__description"><span class="item__furnish">${item.furnish}</span>
              <div class="item__square"><span class="item-square__number">${
  item.square
}</span><span class="item-square__text">площадь                 </span></div>
              <div class="item__floor"> <span class="item-floor__number">${
  item.floor
}</span><span class="item-floor__text">этаж</span></div>
            </div><span class="item__price">${item.pricetext}</span>
          </div>
          <div class="item__footer">
            <div class="item__status">${item.status}</div>
          </div>
        </div>
      </div>
  `;
  }

  const itemsArray = [{
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №1144',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
      discount: '50%',
      label: 'скидка',
    }, {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №2244',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
      discount: '50%',
      label: 'скидка',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
    {
      class: 'item-booked',
      src: 'assets/img/plan-1.png',
      name: 'Студия №3344',
      furnish: 'без отделки',
      square: '28 м',
      floor: '12/14',
      pricetext: '1 900 000 руб.',
      status: 'забронировано',
    },
  ];
});
