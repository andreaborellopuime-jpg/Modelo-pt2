/* ---- Flechas de las tarjetas ---- */
const botones = document.querySelectorAll('.card-arrow');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const idPanel = boton.getAttribute('aria-controls');
    const estabaAbierto = boton.getAttribute('aria-expanded') === 'true';

    botones.forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      document.getElementById(b.getAttribute('aria-controls')).classList.remove('abierto');
    });

    if (!estabaAbierto) {
      boton.setAttribute('aria-expanded', 'true');
      document.getElementById(idPanel).classList.add('abierto');
    }
  });
});

/* ---- Opciones del menú lateral de cada panel ---- */
document.querySelectorAll('.panel').forEach(panel => {
  const opciones = panel.querySelectorAll('.opcion');
  const vistas = panel.querySelectorAll('.vista');

  opciones.forEach(op => {
    op.addEventListener('click', () => {
      opciones.forEach(o => {
        o.classList.toggle('activa', o === op);
        o.setAttribute('aria-selected', String(o === op));
      });
      vistas.forEach(v => v.classList.toggle('activa', v.id === op.dataset.vista));
    });
  });
});

/* ---- Carruseles automáticos (noticias y anuncios) ---- */
const INTERVALO = 5000; // milisegundos entre cada cambio

document.querySelectorAll('[data-carrusel]').forEach(seccion => {
  const slides = seccion.querySelectorAll('.anuncio');
  const contenedorPuntos = seccion.querySelector('.anuncios-puntos');
  let actual = 0;
  let timer = null;

  const puntos = [...slides].map((_, i) => {
    const p = document.createElement('button');
    p.setAttribute('aria-label', 'Ir al elemento ' + (i + 1));
    p.addEventListener('click', () => { mostrar(i); detener(); iniciar(); });
    contenedorPuntos.appendChild(p);
    return p;
  });

  function mostrar(i) {
    actual = i;
    slides.forEach((s, n) => s.classList.toggle('activo', n === i));
    puntos.forEach((p, n) => p.classList.toggle('activo', n === i));
  }
  function iniciar() { if (!timer) timer = setInterval(() => mostrar((actual + 1) % slides.length), INTERVALO); }
  function detener() { clearInterval(timer); timer = null; }

  mostrar(0);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    iniciar();
    seccion.addEventListener('mouseenter', detener);
    seccion.addEventListener('mouseleave', iniciar);
  }
});
