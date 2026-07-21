const navText = document.querySelectorAll("li>a");
const introductionSection = document.getElementById("introduction-section");
const booksSection = document.querySelector(".carousel");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
const hiddenText = document.querySelectorAll('.hidden-text');

hiddenText.forEach((p, index) => {
  p.style.setProperty("--delay", `${0.7 + (index * 0.3)}s`);
});

hiddenElements.forEach((el) => observer.observe(el));
hiddenText.forEach(el => observer.observe(el));

/* Above is the text animation loading thing */

window.addEventListener("scroll", (e) => {
  const introTriggerRect = introductionSection.getBoundingClientRect();
  const booksTriggerRect = booksSection.getBoundingClientRect();
  const introIsInView = introTriggerRect.top < (window.innerHeight * 0.5) && introTriggerRect.bottom > 0;
  const booksIsInView = booksTriggerRect.top < (window.innerHeight * 0.5) && booksTriggerRect.bottom > 0;

  if (introIsInView) {
    navText.forEach((link) => {
      link.style.color = "rgba(160, 170, 255)";
      link.style.textShadow = "0px 0px 3px rgba(120, 0, 170)";
    });
  } else if (booksIsInView) {
    navText.forEach((link) => {
      link.style.color = "white";
      link.style.textShadow = "0px 0px 3px ghostwhite";
    });
  } else {
    navText.forEach((link) => {
      link.style.color = "skyblue";
      link.style.textShadow = "0px 0px 3px skyblue";
    });
  }
});

/* The code above changes the colors of the links depending on what part of the page they are on */

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".slide-dots button");

let current = 0;

function goToSlide(index) {
  current = index;

  slides.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[current].classList.add("active");

  // Match carousel height to current slide
  carousel.style.height = `${slides.children[current].offsetHeight}px`;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (!isDragging2) {
    let difference = startX - endX;

    // Swiped left
    if (difference > 50) {
      current++;

      if (current >= dots.length) {
        current = dots.length - 1;
      }

      goToSlide(current);
    }

    // Swiped right
    if (difference < -50) {
      current--;

      if (current < 0) {
        current = 0;
      }

      goToSlide(current);
    }
  }
});

let autoSlide = setInterval(() => {
  current++;

  if (current >= slides.children.length) {
    current = 0;
  }

  goToSlide(current);
}, 8500);

let startX2 = 0;
let endX2 = 0;
let isDragging2 = false;
let hasMoved2 = false;

carousel.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse") return;

  startX2 = e.clientX;
  endX2 = startX2;
  isDragging2 = true;
  hasMoved2 = false;
});

carousel.addEventListener("pointermove", (e) => {
  if (!isDragging2) return;

  endX2 = e.clientX;

  if (Math.abs(startX2 - endX2) > 10) {
    hasMoved2 = true;
  }
});

carousel.addEventListener("pointerup", () => {
  if (!isDragging2) return;

  let distance = startX2 - endX2;

  if (Math.abs(distance) > 50) {
    if (distance > 0) {
      current++;
    } else {
      current--;
    }

    current = Math.max(0, Math.min(current, slides.children.length - 1));

    goToSlide(current);
  }

  isDragging2 = false;
});

const nav = document.querySelector("nav");

function openNav() {
  nav.classList.add("appear");
}

function closeNav() {
  nav.classList.remove("appear");
}