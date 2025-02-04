const swiper = new Swiper(".poster.swiper", {
  //自動輪播
  autoplay: true,

  loop: true,
  pagination: {
    el: ".dots-list",
    bulletClass: "bullet",
    bulletActiveClass: "bullet-active",
    clickable: true,
  },
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".pre-btn",
  },
});
const workSpaceSwiper = new Swiper(".space.swiper", {
  //自動輪播
  // autoplay: false,

  //循环模式
  loop: false,
  grid: {
    rows: 1,
  },
  slidesPerView: 1.3, // 在桌面上显示3个幻灯片

  // pagination: {
  //   el: ".dots-list",
  //   bulletClass: "bullet",
  //   bulletActiveClass: "bullet-active",
  //   clickable: true,
  // },
 // 幻灯片之间的间距
  spaceBetween: 15,

  breakpoints: {
    // 当屏幕宽度小于768px时
    600: {
      slidesPerView: 3, // 在小屏幕上显示1个幻灯片
    },
    // 当屏幕宽度在768px到1024px之间时
    1024: {
      slidesPerView: 3, // 在中等屏幕上显示2个幻灯片
    },
  },
});

const promoteCarousel = new Swiper(".promote-carousel", {
  depth: 100,
  autoplay: true,
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  speed: 3000,
  //整個模式:自輪模式
  freeMode: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: {
      //輪播圖片張數
      slidesPerView: 3,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 5,
    },
  },
  on: {
    tap: function (swiper, event) {
      alert("你碰了Swiper");
    },
  },
});
// 鼠标悬停停止自动播放
promoteCarousel.el.onmouseover = function () {
  promoteCarousel.autoplay.stop();
  console.log("1");
};

// 鼠标离开开始自动播放
promoteCarousel.el.onmouseout = function () {
  promoteCarousel.autoplay.start();
  console.log("2");
};
