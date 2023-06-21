// message : 스크롤 내리면 나타나고 올리면 사라지는 이벤트
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", revealImages);
});

function revealImages() {
  var messageImages = document.querySelectorAll(".message__img-item");

  for (var i = 0; i < messageImages.length; i++) {
    var windowHeight = window.innerHeight;
    var messageImageTop = messageImages[i].getBoundingClientRect().top;
    var messageImageBottom = messageImages[i].getBoundingClientRect().bottom;
    var messageImagePoint = 100;

    if (messageImageTop < windowHeight - messageImagePoint && messageImageBottom > messageImagePoint) {
      messageImages[i].classList.add("active");
    } else {
      return;
    }
  }
}

// service : 스크롤 내리면 img-item 나오는 이벤트
function fadeInElements() {
  var analysisTextElement = document.querySelector(".service__analysis__guide__text");
  var recommendationTextElement = document.querySelector(".service__recommendation__guide__text");
  var analysisImageElement = document.querySelector(".service__analysis__img-item");
  var recommendationImageElement = document.querySelector(".service__recommendation__img-item");

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

window.addEventListener("scroll", fadeInElements);
