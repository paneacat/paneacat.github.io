document.addEventListener('DOMContentLoaded', () => {

  // ===== ELEMENTI =====
  const bottoniCategoria = document.querySelectorAll('[data-filter]');
  const bottoniGenere = document.querySelectorAll('[data-genere]');
  const cards = Array.from(document.querySelectorAll('.card'));
  const empty = document.getElementById('emptyState');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // ===== STATI =====
  let filtroCategoria = "tutti";
  let filtroGenere = "tutti";

  // 🔥 STEP DINAMICO
  function getStep() {
    return window.innerWidth >= 900 ? 3 : 4;
  }

  let step = getStep();
  let visibiliMax = step;

  // ===== NORMALIZZAZIONE =====
  const norm = (v) => (v || "").trim().toLowerCase();

  // ===== CLICK CATEGORIE =====
  bottoniCategoria.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroCategoria = norm(btn.dataset.filter) || "tutti";

      bottoniCategoria.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      step = getStep();
      visibiliMax = step; // reset corretto
      aggiornaFiltri();
    });
  });

  // ===== CLICK GENERI =====
  bottoniGenere.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroGenere = norm(btn.dataset.genere) || "tutti";

      bottoniGenere.forEach(b => b.classList.remove('attivo'));
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

    // 1. FILTRO BASE
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

    // 2. MOSTRA SOLO FINO A visibiliMax 🔥
    filtrati.forEach((card, i) => {
      if (i < visibiliMax) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // ===== EMPTY STATE =====
    if (empty) {
      if (filtrati.length === 0) {
        empty.style.display = "block";
        empty.classList.add("show");
      } else {
        empty.classList.remove("show");
        empty.style.display = "none";
      }
    }

    // ===== LOAD MORE =====
    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        filtrati.length > visibiliMax ? "inline-block" : "none";
    }

  }

  // ===== RESIZE (super importante) =====
  window.addEventListener('resize', () => {
    const newStep = getStep();

    if (newStep !== step) {
      step = newStep;
      visibiliMax = step;
      aggiornaFiltri();
    }
  });

  // ===== INIT =====
  aggiornaFiltri();

});
