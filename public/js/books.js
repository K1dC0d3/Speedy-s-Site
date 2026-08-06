const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const particleCount =
  window.innerWidth > 1200 ? 120 :
    window.innerWidth > 768 ? 70 :
      35;

// Smooth parallax variables
let targetScroll = window.scrollY;
let currentScroll = window.scrollY;

window.addEventListener("scroll", () => {
  targetScroll = window.scrollY;
});

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const particles = [];

class Particle {

  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 2 + 1;

    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = -Math.random() * 0.3 - 0.05;

    this.alpha = Math.random() * 0.4 + 0.1;

    this.color = [
      "#d8b4fe",
      "#c084fc",
      "#a78bfa",
      "#ffffff"
    ][Math.floor(Math.random() * 4)];

    this.offset = Math.random() * Math.PI * 2;

    // -------- Premium effects --------

    // How close the particle is to the camera
    this.depth = Math.random() * 0.25 + 0.05;

    // Bigger particles appear closer
    this.radius *= 0.5 + this.depth * 2;

    // Stronger glow for closer particles
    this.shadow = 5 + this.depth * 35;

    // Gentle side-to-side drifting
    this.waveOffset = Math.random() * Math.PI * 2;
    this.waveStrength = Math.random() * 8 + 2;
  }

  update(time) {

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y < -10)
      this.y = canvas.height + 10;

    if (this.x < -10)
      this.x = canvas.width + 10;

    if (this.x > canvas.width + 10)
      this.x = -10;

    this.alpha += Math.sin(time * 0.001 + this.offset) * 0.002;
  }

  draw(time) {

    ctx.save();

    ctx.globalAlpha = this.alpha;

    const drawX =
      this.x +
      Math.sin(time * 0.0004 + this.waveOffset) *
      this.waveStrength;

    const drawY =
      this.y -
      currentScroll * this.depth;

    ctx.beginPath();
    ctx.arc(drawX, drawY, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;

    ctx.shadowBlur = this.shadow;
    ctx.shadowColor = this.color;

    ctx.fill();

    ctx.restore();
  }

}

for (let i = 0; i < particleCount; i++)
  particles.push(new Particle());

function animate(time) {

  // Smoothly follow the scroll position
  currentScroll += (targetScroll - currentScroll) * 0.08;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(time);
    particle.draw(time);
  });

  requestAnimationFrame(animate);

}

const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
hiddenElements.forEach((el) => observer.observe(el));

// Removes added unblur delay on books for smaller books
if (window.innerWidth < 800) {
  const books = document.querySelectorAll(".book");
  books.forEach((book) => {
    book.style.transitionDelay = "0s";
  });
}

animate();