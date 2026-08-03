const bookCover = document.getElementById("bookCover");
const mobileView = document.getElementById("mobile");
const desktopView = document.getElementById("desktop");
const bookDetails = document.querySelector("section.book-details");

responsive();

window.addEventListener("resize", () => {
  responsive();
});

function responsive() {
  if (window.innerWidth < 800) {
    bookCover.setAttribute("src", "../../assets/IMG-20260710-WA0044.jpg");
  } else {
    bookCover.setAttribute("src", "../../assets/IMG-20260710-WA0045.jpg");
  }

  if (window.innerWidth <= 700) {
    mobileView.appendChild(bookDetails);
  } else {
    desktopView.appendChild(bookDetails);
  }
}

function toggleStory() {
  const story = document.querySelector("div.more-story");
  const button = document.querySelector("button#read-more");

  story.classList.toggle("open");

  button.textContent = story.classList.contains("open")
    ? "Read Less"
    : "Read More";
}