
document.addEventListener('DOMContentLoaded', () => {

  // ===== ELEMENTI =====
  const bottoni = document.querySelectorAll('.filtro');
  const cards = Array.from(document.querySelectorAll('.card'));
  const empty = document.getElementById('emptyState');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  let filtroCategoria = "tutti";
  let filtroGenere = "tutti";

  function getStep() {
    return window.innerWidth >= 900 ? 3 : 4;
  }

  let step = getStep();
  let visibiliMax = step;

  const norm = (v) => (v || "").trim().toLowerCase();

  // ===== CLICK FILTRI =====
  bottoni.forEach(btn => {
    btn.addEventListener('click', () => {

      const filtro = norm(btn.dataset.filter);

      if (btn.closest('.top')) {
        filtroCategoria = filtro;
        document.querySelectorAll('.top .filtro')
          .forEach(b => b.classList.remove('attivo'));
      } else {
        filtroGenere = filtro;
        document.querySelectorAll('.bottom .filtro')
          .forEach(b => b.classList.remove('attivo'));
      }

      btn.classList.add('attivo');

      step = getStep();
      visibiliMax = step;

      aggiornaFiltri();
    });
  });

  // ===== LOAD MORE =====
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibiliMax += step;
      aggiornaFiltri();
    });
  }

  // ===== FILTRO =====
  function aggiornaFiltri() {

    let filtrati = [];

    cards.forEach(card => {

      const categoria = norm(card.dataset.categoria);

      const generi = (card.dataset.genere || "")
        .split(" ")
        .map(g => g.trim().toLowerCase())
        .filter(Boolean);

      const matchCategoria =
        filtroCategoria === "tutti" || categoria === filtroCategoria;

      const matchGenere =
        filtroGenere === "tutti" || generi.includes(filtroGenere);

      if (matchCategoria && matchGenere) {
        filtrati.push(card);
      } else {
        card.style.display = "none";
      }

    });

    filtrati.forEach((card, i) => {
      card.style.display = i < visibiliMax ? "block" : "none";
    });

    if (empty) {
      if (filtrati.length === 0) {
        empty.style.display = "block";
        empty.classList.add("show");
      } else {
        empty.classList.remove("show");
        empty.style.display = "none";
      }
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        filtrati.length > visibiliMax ? "inline-block" : "none";
    }
  }

  // ===== RESIZE =====
  window.addEventListener('resize', () => {
    const newStep = getStep();

    if (newStep !== step) {
      step = newStep;
      visibiliMax = step;
      aggiornaFiltri();
    }
  });

  // ===== INIT FILTRI =====
  aggiornaFiltri();

  // ===== 🎬 CINEMA SLIDER =====

  function initCinema() {
  const slider = document.querySelector('.slider');
  const cards = document.querySelectorAll('.slide-card, .slide-card-cta');
  const next = document.querySelector('.slider-btn.next');
  const prev = document.querySelector('.slider-btn.prev');

  if (!slider || cards.length === 0) return;

  function updateActive() {
    const center = slider.getBoundingClientRect().left + slider.clientWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;

      const isActive = Math.abs(center - cardCenter) < rect.width / 2;
      card.classList.toggle('is-active', isActive);
    });
  }

  // ===== SNAP "MAGNETICO"
  function snapToClosest() {
    let closest = null;
    let minOffset = Infinity;

    const center = slider.scrollLeft + slider.clientWidth / 2;

    cards.forEach(card => {
      const offsetLeft = card.offsetLeft + card.offsetWidth / 2;
      const offset = Math.abs(center - offsetLeft);

      if (offset < minOffset) {
        minOffset = offset;
        closest = card;
      }
    });

    if (closest) {
      closest.scrollIntoView({
        behavior: "smooth",
        inline: "center"
      });
    }
  }

  // ===== EVENTI =====
  slider.addEventListener('scroll', updateActive);

  let scrollTimeout;
  slider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(snapToClosest, 120);
  });

  // ===== FRECCE =====
  if (next && prev) {
    next.onclick = () => {
      slider.scrollBy({ left: 400, behavior: 'smooth' });
    };

    prev.onclick = () => {
      slider.scrollBy({ left: -400, behavior: 'smooth' });
    };
  }

  // init
  setTimeout(() => {
    cards[0]?.scrollIntoView({ behavior: "smooth", inline: "center" });
    updateActive();
  }, 150);
}

if (window.innerWidth >= 900) {
  initCinema();
}
}
