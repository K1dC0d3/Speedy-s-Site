let startX = 0;
let currentPage = 0;
let isDragging = false;
let hasMoved = false;

const pages = document.querySelector(".pages");
const dots = document.querySelectorAll(".slide-dots button");
const carousel = document.querySelector(".carousel");

carousel.addEventListener("pointerdown", (e) => {
  startX = e.clientX;
  isDragging = true;
  hasMoved = false;
});

carousel.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const distance = e.clientX - startX;

  if (Math.abs(distance) > 10) {
    hasMoved = true;
  }
});

carousel.addEventListener("pointerup", (e) => {
  if (!isDragging) return;

  const distance = startX - e.clientX;

  if (Math.abs(distance) >= 50) {
    if (distance > 0) {
      currentPage++;
    } else {
      currentPage--;
    }

    currentPage = Math.max(
      0,
      Math.min(currentPage, pages.children.length - 1)
    );

    goToPage(currentPage);
  }

  isDragging = false;
});

carousel.addEventListener("pointercancel", () => {
  isDragging = false;
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentPage = index;
    goToPage(currentPage);
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentPage--;
  } else if (e.key === "ArrowRight") {
    currentPage++;
  } else {
    return;
  }

  currentPage = Math.max(
    0,
    Math.min(currentPage, pages.children.length - 1)
  );

  goToPage(currentPage);
});

let autoSlide = setInterval(() => {
  currentPage++;

  if (currentPage >= pages.children.length) {
    currentPage = 0;
  }

  goToPage(currentPage);
}, 20000);

function goToPage(current) {
  pages.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));

  if (dots[current]) {
    dots[current].classList.add("active");
  }
}

let characters = [];
const body = document.querySelector("body");
const characterModal = document.querySelector(".character-modal");
const characterCard = document.querySelector(".character-card");
const characterImage = document.getElementById("characterImage");
const characterRole = document.getElementById("characterRole");
const characterName = document.getElementById("characterName");
const characterBio = document.getElementById("characterBio");
const characterAbilities = document.getElementById("characterAbilities");

fetch("../data/characters.json")
  .then(response => response.json())
  .then(data => {

    characters = data;

  });

document.querySelectorAll(".character").forEach(card => {
  card.addEventListener("click", () => {
    openCharacter(card.dataset.id);
  });
});

function openCharacter(id) {
  body.classList.add("modal-open");
  characterModal.classList.add("open");

  // Create a history entry for the open modal
  history.pushState({ characterModal: true }, "");

  carousel.style.filter = "blur(5px)";
  characterCard.style.transform = "scale(1)";

  const character = characters.find(c => c.id === id);
  let abilities = "";

  character.abilities.forEach((a, index) => {
    if (index != character.abilities.length - 1) {
      abilities += a + " • ";
    } else {
      abilities += a;
    }
  });

  characterImage.src = character.image;
  characterName.textContent = character.name;
  characterRole.textContent = character.role;
  characterBio.innerHTML = character.bio;
  characterAbilities.textContent = abilities;
}


function exitPopup() {
  characterCard.style.transform = "scale(0.9)";

  body.classList.remove("modal-open");
  characterModal.classList.remove("open");
  carousel.style.filter = "blur(0px)";

  // Remove the modal's history entry
  if (history.state?.characterModal) {
    history.back();
  }
}


// Phone/browser back button
window.addEventListener("popstate", () => {
  if (characterModal.classList.contains("open")) {
    characterCard.style.transform = "scale(0.9)";

    body.classList.remove("modal-open");
    characterModal.classList.remove("open");
    carousel.style.filter = "blur(0px)";
  }
});

function buttonSwipe(right) {
  if (right) {
    currentPage++;
  } else {
    currentPage--;
  }

  currentPage = Math.max(
    0,
    Math.min(currentPage, pages.children.length - 1)
  );

  goToPage(currentPage);
}

const navigationButtons = document.querySelectorAll(".navigation");

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    navigationButtons.forEach(button => {
      button.style.opacity = entry.isIntersecting ? 1 : 0;
    });
  });
}, {
  threshold: 0.4
});

observer2.observe(carousel);