const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

let currentIndex = 0;
const slideCount = slides.length;
const slideWidth = slides[0].offsetWidth + 15; // スライド幅＋gap
let autoSlideInterval;

// スライド移動関数
function goToSlide(index) {
  currentIndex = (index + slideCount) % slideCount;
  slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

// 自動スライド開始
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 3000);
}

// 自動スライド停止
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// クリックで移動
slider.addEventListener('click', (e) => {
  const clickX = e.clientX;
  const centerX = window.innerWidth / 2;
  if (clickX > centerX) {
    goToSlide(currentIndex + 1); // 右側クリック → 次へ
  } else {
    goToSlide(currentIndex - 1); // 左側クリック → 前へ
  }
});

// スワイプ対応
let startX = 0;
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  stopAutoSlide();
});

slider.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    goToSlide(currentIndex + 1); // 左スワイプ → 次へ
  } else if (endX - startX > 50) {
    goToSlide(currentIndex - 1); // 右スワイプ → 前へ
  }
  startAutoSlide();
});

// 初期化
goToSlide(0);
startAutoSlide();
