document.addEventListener('DOMContentLoaded', () => {

  // BOTTONI
  const bottoniCategoria = document.querySelectorAll('.filtro-categoria');
  const bottoniGenere = document.querySelectorAll('.filtro-genere');
  const cards = document.querySelectorAll('.card');

  // STATI ATTIVI
  let filtroCategoria = "tutti";
  let filtroGenere = "tutti";

  // ===== CATEGORIE =====
  bottoniCategoria.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroCategoria = btn.dataset.filter;

      // reset stato attivo
      bottoniCategoria.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      aggiornaFiltri();
    });
  });

  // ===== GENERI =====
  bottoniGenere.forEach(btn => {
    btn.addEventListener('click', () => {

      filtroGenere = btn.dataset.genere;

      // reset stato attivo
      bottoniGenere.forEach(b => b.classList.remove('attivo'));
      btn.classList.add('attivo');

      aggiornaFiltri();
    });
  });

  // ===== LOGICA FILTRO =====
  function aggiornaFiltri() {

    cards.forEach(card => {

      const categoria = card.dataset.categoria;
      const genere = card.dataset.genere;

      const matchCategoria =
        filtroCategoria === "tutti" || categoria === filtroCategoria;

      const matchGenere =
        filtroGenere === "tutti" || genere.includes(filtroGenere);

      if (matchCategoria && matchGenere) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  }

});
