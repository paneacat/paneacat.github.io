// Aspetta che la pagina sia completamente caricata
document.addEventListener("DOMContentLoaded", () => {

  // ===== FILTRI =====
  const filtri = document.querySelectorAll('.filtro');
  const cards = document.querySelectorAll('.card');

  filtri.forEach(filtro => {
    filtro.addEventListener('click', () => {

      // rimuove attivo da tutti
      filtri.forEach(f => f.classList.remove('attivo'));

      // aggiunge attivo al cliccato
      filtro.classList.add('attivo');

      const categoria = filtro.dataset.filtro;

      // mostra/nasconde card
      cards.forEach(card => {
        const tag = card.dataset.tag;

        if (categoria === "tutti" || tag === categoria) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });

    });
  });

});


// ===== MENU HAMBURGER =====
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");

  // blocca scroll quando menu aperto (bonus)
  document.body.classList.toggle("no-scroll");
}
