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

  let visibiliMax = 2; // 🔥 QUANTI FILM MOSTRI ALL’INIZIO

  // ===== FILTRI CLICK =====
  bottoniCategoria.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroCategoria = btn.dataset.filter || "tutti";

      bottoniCategoria.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      visibiliMax = 2; // reset quando cambi filtro
      aggiornaFiltri();
    });
  });

  bottoniGenere.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroGenere = btn.dataset.genere || "tutti";

      bottoniGenere.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      visibiliMax = 2;
      aggiornaFiltri();
    });
  });

  // ===== LOAD MORE =====
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibiliMax += 2; // 🔥 quanti ne aggiungi ogni click
      aggiornaFiltri();
    });
  }

  // ===== FILTRO =====
  function aggiornaFiltri() {

    let visibili = 0;
    let filtrati = [];

    // 1. filtro base
    cards.forEach(card => {

      const categoria = card.dataset.categoria || "";
      const generi = (card.dataset.genere || "").split(" ");

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

    // 2. mostra solo fino a visibiliMax
    filtrati.forEach((card, i) => {

      if (i < visibiliMax) {
        card.style.display = "block";
        visibili++;
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

    // ===== LOAD MORE VISIBILITY =====
    if (loadMoreBtn) {
      if (filtrati.length > visibiliMax) {
        loadMoreBtn.style.display = "inline-block";
      } else {
        loadMoreBtn.style.display = "none";
      }
    }

  }

  // inizializza
  aggiornaFiltri();

});
