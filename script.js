document.addEventListener('DOMContentLoaded', () => {

  // ===== ELEMENTI =====
  const bottoni = document.querySelectorAll('.filtro'); // 🔥 unico selettore
  const cards = Array.from(document.querySelectorAll('.card'));
  const empty = document.getElementById('emptyState');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  // ===== STATI =====
  let filtroCategoria = "tutti";
  let filtroGenere = "tutti";

  // ===== STEP DINAMICO =====
  function getStep() {
    return window.innerWidth >= 900 ? 6 : 4;
  }

  let step = getStep();
  let visibiliMax = step;

  // ===== NORMALIZZAZIONE =====
  const norm = (v) => (v || "").trim().toLowerCase();

  // ===== CLICK FILTRI =====
  bottoni.forEach(btn => {
    btn.addEventListener('click', () => {

      const filtro = norm(btn.dataset.filter);

      // 🔥 capisce se è categoria o genere
      if (btn.closest('.top')) {
        filtroCategoria = filtro;
      } else {
        filtroGenere = filtro;
      }

      // attivo UI SOLO nella sua riga
      const gruppo = btn.parentElement.querySelectorAll('.filtro');
      gruppo.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      // reset load more
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

    // ===== MOSTRA PROGRESSIVA =====
    filtrati.forEach((card, i) => {
      card.style.display = i < visibiliMax ? "block" : "none";
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

  // ===== RESIZE =====
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
