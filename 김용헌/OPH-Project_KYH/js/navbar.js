// menu, close 클릭 이벤트
const menuBtn = document.querySelector(".navbar__icon--menu");
const closeBtn = document.querySelector(".navbar__icon--close");
const menu = document.querySelector(".navbar__menu");
const user = document.querySelector(".navbar__user");

const toggleMenu = () => {
  menu.classList.toggle("active");
  user.classList.toggle("active");
  closeBtn.classList.toggle("active");
  menuBtn.classList.toggle("active");

};

menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

// 스크롤 시 navbar box-shadow 효과 이벤트
const navbar = document.querySelector(".navbar");
const navHeight = navbar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  if (window.scrollY >= navHeight) {
    navbar.classList.add("box-shadow");
  } else {
    navbar.classList.remove("box-shadow");
  }
});
