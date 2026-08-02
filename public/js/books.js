const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const particleCount =
  window.innerWidth > 1200 ? 120 :
    window.innerWidth > 768 ? 70 :
      35;

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

  draw() {

    ctx.save();

    ctx.globalAlpha = this.alpha;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;

    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;

    ctx.fill();

    ctx.restore();
  }

}

for (let i = 0; i < particleCount; i++)
  particles.push(new Particle());

function animate(time) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(time);
    particle.draw();
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

animate();