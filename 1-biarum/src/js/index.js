// import "./libs";

const modal = document.getElementsByClassName("modal")[0];
const modalCloser = document.getElementsByClassName("modal__closer")[0];
const modalButton = document.querySelector(".modal__button");
const hamburger = document.getElementsByClassName("header__hamburger")[0];
const menu = document.getElementsByClassName("menu-sidebar")[0];
const menuCloser = document.querySelector(".menu-sidebar__closer");

function handleClick(element, item, add) {
  element.addEventListener("click", function() {
    if (!add) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  });
}
handleClick(hamburger, menu, true);
handleClick(menuCloser, menu, false);
handleClick(modalCloser, modal, false);
handleClick(modalButton, modal, false);
