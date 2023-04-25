// disable scroll when mobile is active
const body = document.querySelector("body");
const mobileNav = document.querySelector(".mobile-nav");

function toggleMobileNav() {
  mobileNav.classList.toggle("is-active");
  if (mobileNav.classList.contains("is-active")) {
    body.style.overflow = "hidden"; /* disable scroll */
  } else {
    body.style.overflow = "auto"; /* enable scroll */
  }
}

// hamburger toggle
const menu_btn = document.querySelector(".hamburger");
menu_btn.addEventListener("click", function () {
  toggleMobileNav();
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

// disable scroll when contactform is active
const contactBtn = document.getElementById("contact-btn");
const contactFormContainer = document.querySelector(".contact-form-container");
const closeBtn = document.querySelector(".close-btn");

contactBtn.addEventListener("click", () => {
  contactFormContainer.classList.add("active");
  body.style.overflow = "hidden"; /* disable scroll */
});

closeBtn.addEventListener("click", () => {
  contactFormContainer.classList.remove("active");
  body.style.overflow = "auto"; /* enable scroll */
});

// display hidden content
$(document).ready(function () {
  $(".read-more-btn").click(function () {
    var hiddenContent = $(this).prev(".hidden-content");
    if (hiddenContent.is(":hidden")) {
      hiddenContent.slideDown(800);
      $(this).html("<ion-icon name='arrow-dropup-circle'></ion-icon>");
    } else {
      hiddenContent.slideUp(800);
      $(this).html("<ion-icon name='arrow-dropdown-circle'></ion-icon>");
    }
  });
});

// onscroll content reveal
window.addEventListener("scroll", reveal);
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 120;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

// onscroll background image and content opacity change
window.addEventListener("scroll", function () {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  if (viewportWidth > 768) {
    const container = document.getElementById("container1");
    const bg = container.style;
    bg.opacity = 1 - +window.pageYOffset / 600 + "";

    if (window.pageYOffset === 0) {
      bg.backgroundSize = "140";
    } else {
      bg.backgroundSize = 140 - +window.pageYOffset / 12 + "%";
    }

    const content = container.querySelector(".content");
    content.style.opacity = 1 - +window.pageYOffset / 500 + "";
  }
});

//back to the top
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

//preload duration and display
window.addEventListener("load", function () {
  const preloader = document.querySelector("#preloader");
  const content = document.querySelector("#content");
  setTimeout(function () {
    preloader.classList.add("hide"); // add hide class after delay
    content.classList.add("show"); // add show class to reveal content
  }, 3000);
});

// infinite marquee
class LoopingElement {
  constructor(element, currentTranslation, speed) {
    this.element = element;
    this.currentTranslation = currentTranslation;
    this.speed = speed;
    this.direction = true;
    this.scrollTop = 0;
    this.metric = 100;

    this.lerp = {
      current: this.currentTranslation,
      target: this.currentTranslation,
      factor: 0.2,
    };

    this.events();
    this.render();
  }

  events() {
    window.addEventListener("scroll", (e) => {
      let direction = window.pageYOffset || document.documentElement.scrollTop;
      if (direction > this.scrollTop) {
        this.direction = true;
        this.lerp.target += this.speed * 5;
      } else {
        this.direction = false;
        this.lerp.target -= this.speed * 5;
      }
      this.scrollTop = direction <= 0 ? 0 : direction;
    });
  }

  lerpFunc(current, target, factor) {
    this.lerp.current = current * (1 - factor) + target * factor;
  }

  goForward() {
    this.lerp.target += this.speed;
    if (this.lerp.target > this.metric) {
      this.lerp.current -= this.metric * 2;
      this.lerp.target -= this.metric * 2;
    }
  }

  goBackward() {
    this.lerp.target -= this.speed;
    if (this.lerp.target < -this.metric) {
      this.lerp.current -= -this.metric * 2;
      this.lerp.target -= -this.metric * 2;
    }
  }

  animate() {
    this.direction ? this.goForward() : this.goBackward();
    this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor);

    this.element.style.transform = `translateX(${this.lerp.current}%)`;
  }

  render() {
    this.animate();
    window.requestAnimationFrame(() => this.render());
  }
}

let elements = document.querySelectorAll(".item");

new LoopingElement(elements[0], 0, 0.08);
new LoopingElement(elements[1], -100, 0.08);
