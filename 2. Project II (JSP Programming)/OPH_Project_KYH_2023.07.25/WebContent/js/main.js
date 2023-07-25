/*  Carousel 기능*/
(function() {
  const carousel = document.querySelector('.carousel');
  const images = Array.from(carousel.getElementsByClassName('main__carousel__img'));
  let currentIndex = 0;

  
  function slideCarousel() {
    currentIndex = (currentIndex + 1) % images.length;
    const translateX = -currentIndex * 100;
    carousel.style.transform = `translateX(${translateX}vw)`;
  }

  setInterval(slideCarousel, 3000);
})();


/* content : 스크롤 내리면 나타나고 올리면 사라지는 이벤트 */
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', revealElements);
});

function revealElements() {
  var fadeElements = document.querySelectorAll('.fade-in');

  for (var i = 0; i < fadeElements.length; i++) {
    var windowHeight = window.innerHeight;
    var fadeElementTop = fadeElements[i].getBoundingClientRect().top;
    var fadeElementBottom = fadeElements[i].getBoundingClientRect().bottom;
    var revealPoint = 100;

    if (fadeElementTop < windowHeight - revealPoint && fadeElementBottom > revealPoint) {
      fadeElements[i].classList.add('visible');
    } else {
      fadeElements[i].classList.remove('visible');
    }
  }
}

/* service : 스크롤 내리면 img-item 나오는 이벤트 */
function fadeInElements() {
  var analysisTextElement = document.querySelector('.service__analysis__guide__text');
  var recommendationTextElement = document.querySelector('.service__recommendation__guide__text');
  var analysisImageElement = document.querySelector('.service__analysis__img-item');
  var recommendationImageElement = document.querySelector('.service__recommendation__img-item');

  var analysisTextPosition = analysisTextElement.getBoundingClientRect();
  var recommendationTextPosition = recommendationTextElement.getBoundingClientRect();

  // analysis text가 화면에 보이는지 확인
  var analysisTextVisible = analysisTextPosition.top < window.innerHeight && analysisTextPosition.bottom >= 0;

  // recommendation text가 화면에 보이는지 확인
  var recommendationTextVisible = recommendationTextPosition.top < window.innerHeight && recommendationTextPosition.bottom >= 0;

  if (analysisTextVisible) {
    analysisImageElement.style.opacity = 1;
  }

  if (recommendationTextVisible) {
    recommendationImageElement.style.opacity = 1;
  }
}

window.addEventListener('scroll', fadeInElements);
