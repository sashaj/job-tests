const methodImages = document.querySelectorAll('.method__img');
const methodItems = document.querySelectorAll('.method__item');
const methodWrapper = document.querySelector('.method__wrapper');
const tabsContent = document.querySelectorAll('.tab__content');
const heroWrapper = document.querySelector('.hero__wrapper');

function manageActiveState(element, mobile) {
  if (methodItems && element && !mobile) {
    methodItems.forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');
  } else if (methodItems && element && mobile) {
    element.classList.toggle('active');
    const panel = element.nextElementSibling;
    panel.classList.toggle('display-none');
  }
}

function hideTabsContent() {
  if (tabsContent) {
    tabsContent.forEach(item => {
      item.classList.add('display-none');
    });
  }
}
function moveTabsContent() {
  if (tabsContent && methodItems) {
    tabsContent.forEach((item, index) => {
      methodItems[index].after(item);
    });
  }
}

function slideUpAnimationLogic(index) {
  if (!methodWrapper.classList.contains('slide-up-fade-out') && methodWrapper) {
    methodWrapper.classList.add('slide-up-fade-out');
    setTimeout(() => {
      methodImages.forEach(item => {
        item.classList.add('display-none');
      });
      tabsContent[index].classList.remove('display-none');
    }, 700);
  } else if (methodWrapper) {
    tabsContent[index].classList.remove('display-none');
  }
}

function handleItemClickDesktop() {
  const index = Array.from(this.parentElement.children).indexOf(this);
  manageActiveState(this);
  hideTabsContent();
  slideUpAnimationLogic(index);
  if (heroWrapper) {
    heroWrapper.classList.add('change-bg');
  }
}

function handleItemClickMobile() {
  manageActiveState(this, true);
  if (!document.querySelector('.method__item.active')) {
    heroWrapper.classList.remove('change-bg');
  } else {
    heroWrapper.classList.add('change-bg');
  }
}

function controller() {
  if (window.innerWidth >= 900) {
    methodItems.forEach(item => item.addEventListener('click', handleItemClickDesktop));
  } else {
    moveTabsContent();
    methodItems.forEach(item => item.addEventListener('click', handleItemClickMobile));
  }
}
controller();
