"use strict";


// Bài bao gồm lab 5 và lab 6 -------------------------------------------------




const btnsOpenModel = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector(".nav");

//////////////////////////////////////////////////////////////////
// LEC 2) PROJECT: "Bankist" Website

// [SHOW PROJECT]
// This code comes from the modal window we already built earlier. Let's just do 2 quick modifications here!

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModel.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

document.querySelector(".nav__logo").style.height = "45px";

//////////////////////////////////////////////////////////////////-------------------------------------------------------------------------------------------------
// LEC 7)	Implementing Smooth Scrolling
// lab 5.2
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);
  console.log(e.target.getBoundingClientRect());
  console.log(
    "Current scroll position (X/Y):",
    window.pageXOffset,
    window.pageYOffset
  );

  console.log(
    "Height/width of viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  
  section1.scrollIntoView({ behavior: "smooth" });
});


//////////////////////////////////////////////////////////////////------------------------------------------------------------------------------------------
// LEC 10) Event Propagation in Practice
// lab 5.3

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target.className, e.currentTarget.className);
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.table('CONTAINER', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);
  e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('NAVIGATION', e.target);
  console.log('NAVIGATION', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);
});

document.querySelector('.header').addEventListener(
  'click',
  function(e) {
    this.style.backgroundColor = randomColor();
    console.log('HEADER', e.target.className, e.currentTarget.className);
  },

);


//////////////////////////////////////////////////////////////////
// LEC 11) Event Delegation: Implementing Page Navigation
// lab 5.4

const allLinks = document.querySelectorAll(".nav__link");

// And then add one event listener to EACH link
 allLinks.forEach(el =>
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }),
); 
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id !== "#")
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});



//////////////////////////////////////////////////////////////////
// LEC 13) Building a Tabbed Component
// lab 6.1

const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const tabsContainer = document.querySelector(".operations__tab-container");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  console.log(clicked);
  if (clicked) {
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    clicked.classList.add("operations__tab--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

//////////////////////////////////////////////////////////////////
// LEC 14) Passing Arguments to Event Handlers

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////////////////////
// LEC 15) Implementing a Sticky Navigation: The Scroll Event
// lab 6.2 

const initialCoordinates = section1.getBoundingClientRect();
console.log(initialCoordinates,'initialCoordinates');
window.addEventListener('scroll', function(e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
 

//////////////////////////////////////////////////////////////////
// LEC 16) A Better Way: The Intersection Observer API

const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,

  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickNav = function (entries) {
  const [entry] = entries; // Destructuring

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,

  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(document.querySelector(".header"));

//////////////////////////////////////////////////////////////////
// LEC 17) Revealing Elements on Scroll

const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};
const rowObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.17,
});

allSections.forEach((row) => {
  rowObserver.observe(row);
  row.classList.add("section--hidden");
});

//////////////////////////////////////////////////////////////////
// LEC 18) Lazy Loading Images

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) => {
  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", function () {
        this.classList.remove("lazy-img");
      });

      observer.unobserve(entry.target);
    }
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

//////////////////////////////////////////////////////////////////
// LEC 19) 20) 21) Building a Slider Component: Part 1/2/3
// lab 6.3 / lab 6.4
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (dot) => {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((d) => d.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${dot}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.matches(".dots__dot")) {
    const { slide } = e.target.dataset; // Destructuring
    goToSlide(slide);
    activateDot(slide);
  }
});

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();


//////////////////////////////////////////////////////////////////
// LEC 22) Lifecycle DOM Events


document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded, including images!", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
});
