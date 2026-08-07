let startX = 0;
let endX = 0;
let isDragging = false;
let hasMoved = false;
let currentPage = 0;

const pages = document.querySelector(".pages");
const dots = document.querySelectorAll(".slide-dots button");
const carousel = document.querySelector(".carousel");

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (!isDragging) {
    let difference = startX - endX;

    // Swiped left
    if (difference > 50) {
      currentPage++;

      goToPage(currentPage);
    }

    // Swiped right
    if (difference < -50) {
      currentPage--;

      if (currentPage < 0) {
        currentPage = 0;
      }

      goToPage(currentPage);
    }
  }
});

let autoSlide = setInterval(() => {
  currentPage++;

  if (currentPage >= pages.children.length) {
    currentPage = 0;
  }

  goToPage(currentPage);
}, 10000);

carousel.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse") return;

  startX = e.clientX;
  endX = startX;
  isDragging = true;
});

carousel.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  endX = e.clientX;
});

carousel.addEventListener("pointerup", () => {
  if (!isDragging) return;

  let distance = startX - endX;

  if (Math.abs(distance) >= 50) {
    if (distance > 0) {
      currentPage++;
    } else {
      currentPage--;
    }

    currentPage = Math.max(0, Math.min(currentPage, pages.children.length - 1));

    goToPage(currentPage);
  }

  isDragging = false;
});

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    currentPage--;
  } else if (e.key == "ArrowRight") {
    currentPage++;
  }
  currentPage = Math.max(0, Math.min(currentPage, pages.children.length - 1));
  goToPage(currentPage);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToPage(index);
  });
});

function goToPage(current) {
  pages.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[current].classList.add("active");
}

