const navText = document.querySelectorAll("li>a");
const introductionSection = document.getElementById("introduction-section");
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

window.addEventListener("scroll", (e) => {
  const triggerRect = introductionSection.getBoundingClientRect();
  const isInView = triggerRect.top < (window.innerHeight * 0.5) && triggerRect.bottom > 0;

  if (isInView) {
    navText.forEach((link) => {
      link.style.color = "rgba(150, 100, 255)";
      link.style.textShadow = "0px 0px 5px rgba(120, 0, 190)";
    });
  } else {
    navText.forEach((link) => {
      link.style.color = "skyblue";
      link.style.textShadow = "0px 0px 5px skyblue";
    });
  }
});

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".slide-dots button");

let current = 0;

function goToSlide(index) {
  current = index;

  slides.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[current].classList.add("active");
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
});