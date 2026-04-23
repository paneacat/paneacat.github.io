const filtri = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card");

let categoriaAttiva = "tutti";
let genereAttivo = "tutti";

filtri.forEach(btn => {
  btn.addEventListener("click", () => {

    const tipo = btn.dataset.tipo;
    const valore = btn.dataset.valore;

    // aggiorna stato
    if (tipo === "categoria") categoriaAttiva = valore;
    if (tipo === "genere") genereAttivo = valore;

    // attivo UI (solo nel gruppo giusto)
    document
      .querySelectorAll(`.filtro[data-tipo="${tipo}"]`)
      .forEach(b => b.classList.remove("attivo"));

    btn.classList.add("attivo");

    // FILTRO COMBINATO
    cards.forEach(card => {

      const matchCategoria =
        categoriaAttiva === "tutti" ||
        card.dataset.categoria === categoriaAttiva;

      const matchGenere =
        genereAttivo === "tutti" ||
        card.dataset.genere.includes(genereAttivo);

      if (matchCategoria && matchGenere) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });
});
