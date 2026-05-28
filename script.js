
function scrollToSection() {
  document.getElementById("projetos").scrollIntoView({ behavior: "smooth" });
}

// =====================
// EFEITO DIGITANDO
// =====================
const text = "João Paulo | Dev";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}

window.onload = typeEffect;

// =====================
// PARTÍCULAS COM CANVAS
// =====================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7
  });
}

function drawLines() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(56,189,248,${0.15 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "rgba(56,189,248,0.7)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  drawLines();
  requestAnimationFrame(animate);
}

animate();


const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = -(y / rect.height - 0.5) * 12;
    const rotY =  (x / rect.width  - 0.5) * 12;

    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
});


function showNotif(msg) {
  const n = document.createElement("div");
  n.className = "notif";
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}

setTimeout(() => showNotif("👋 Bem-vindo ao portfólio!"), 2800);

// =====================
// FADE-IN AO ROLAR (Intersection Observer)
// =====================
const animatedEls = document.querySelectorAll(".cert-card, .comp-item, .info-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = "1";
      entry.target.style.transform  = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => {
  el.style.opacity    = "0";
  el.style.transform  = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});