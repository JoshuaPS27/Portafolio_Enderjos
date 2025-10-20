document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav_link");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6 // al menos el 60% de la sección debe estar visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav_link[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(nav => nav.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});


const flipCard = document.querySelector('.flip-card');
const formulario = document.querySelector('.formulario_contacto');
const otros = document.querySelector('.Otros');

// Restaurar estado al cargar
window.addEventListener('DOMContentLoaded', () => {
  const estado = localStorage.getItem('estadoFlip');

  if (estado === 'formulario') {
    flipCard.classList.add('flipped');
    formulario.style.display = 'block';
    otros.style.display = 'none';
  } else if (estado === 'otros') {
    flipCard.classList.add('flipped');
    formulario.style.display = 'none';
    otros.style.display = 'block';
  } else {
    // Estado inicial: mostrar logo
    flipCard.classList.remove('flipped');
    formulario.style.display = 'none';
    otros.style.display = 'none';
  }
});

// Botón Formulario
document.getElementById('btnformulario1').addEventListener('click', function () {
  const isFlipped = flipCard.classList.contains('flipped');
  const isFormVisible = formulario.style.display === 'block';

  if (isFlipped && isFormVisible) {
    flipCard.classList.remove('flipped');
    formulario.style.display = 'none';
    localStorage.removeItem('estadoFlip');
  } else {
    flipCard.classList.add('flipped');
    formulario.style.display = 'block';
    otros.style.display = 'none';
    localStorage.setItem('estadoFlip', 'formulario');
  }
});

// Botón Otros métodos
document.getElementById('btnformulario2').addEventListener('click', function () {
  const isFlipped = flipCard.classList.contains('flipped');
  const isOtrosVisible = otros.style.display === 'block';

  if (isFlipped && isOtrosVisible) {
    flipCard.classList.remove('flipped');
    otros.style.display = 'none';
    localStorage.removeItem('estadoFlip');
  } else {
    flipCard.classList.add('flipped');
    otros.style.display = 'block';
    formulario.style.display = 'none';
    localStorage.setItem('estadoFlip', 'otros');
  }
});




//Formulario
function redirectAfterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "gracias.html"; // Redirige a la página de gracias
        } else {
            alert("Hubo un error al enviar el formulario.");
        }
    })
    .catch(() => alert("Hubo un error al enviar el formulario."));
}


//aniimacion footer


const canvas = document.getElementById("footerAnimation");
const ctx = canvas.getContext("2d");
const footer = document.querySelector("footer");

function resize() {
  canvas.width = footer.offsetWidth;
  canvas.height = footer.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

function middle(p1, p2) {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
}

function cutCubicIn2(bezier) {
  const pa = middle(bezier[0], bezier[1]);
  const pb = middle(bezier[1], bezier[2]);
  const pc = middle(bezier[2], bezier[3]);
  const pd = middle(pa, pb);
  const pe = middle(pb, pc);
  const pf = middle(pd, pe);
  return [
    [bezier[0], pa, pd, pf],
    [pf, pe, pc, bezier[3]],
  ];
}

function drawBezier(b, color) {
  ctx.beginPath();
  ctx.moveTo(b[0][0], b[0][1]);
  ctx.bezierCurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
}

function generateFractal(b, depth) {
  if (depth === 0) return [b];
  const [left, right] = cutCubicIn2(b);
  return [...generateFractal(left, depth - 1), ...generateFractal(right, depth - 1)];
}

let t = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width, h = canvas.height;

  const start = [w * 0.2, h * 0.6];
  const end = [w * 0.8, h * 0.6];
  const c1 = [w * 0.4, h * (0.3 + 0.2 * Math.sin(t))];
  const c2 = [w * 0.6, h * (0.3 - 0.2 * Math.sin(t))];

  const bezier = [start, c1, c2, end];
  const curves = generateFractal(bezier, 5);

  const hue = (t * 40) % 360;
  const color = `hsl(${hue}, 100%, 60%)`;

  for (const c of curves) drawBezier(c, color);

  t += 0.02;
  requestAnimationFrame(animate);
}

animate();

const carousel = document.getElementById('carousel');
  const cards = carousel.querySelectorAll('.card');
  let angle = 0;
  const step = 360 / cards.length;
  let autoRotate;

  function positionCards() {
    cards.forEach((card, i) => {
      const rotation = i * step;
      card.style.transform = `rotateY(${rotation}deg) translateZ(400px)`;
    });
  }

  function rotateCarousel(direction = 1) {
    angle += direction * step;
    carousel.style.transform = `rotateY(${angle}deg)`;
  }

  function startAutoRotate() {
    autoRotate = setInterval(() => rotateCarousel(1), 3000); // cada 3 segundos
  }

  function stopAutoRotate() {
    clearInterval(autoRotate);
  }

  // Eventos para flechas
  document.querySelector('.arrow.left').addEventListener('click', () => {
    stopAutoRotate();
    rotateCarousel(-1);
  });

  document.querySelector('.arrow.right').addEventListener('click', () => {
    stopAutoRotate();
    rotateCarousel(1);
  });

  // Eventos para detener al pasar el cursor
  document.querySelector('.carousel-wrapper').addEventListener('mouseenter', stopAutoRotate);
  document.querySelector('.carousel-wrapper').addEventListener('mouseleave', startAutoRotate);

  positionCards();
  startAutoRotate();

//habilidades
document.querySelectorAll('.habilidad').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });


