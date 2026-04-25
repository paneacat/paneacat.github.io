const filtri = document.querySelectorAll('.filtro');
const cards = document.querySelectorAll('.card');

filtri.forEach(btn => {
  btn.addEventListener('click', () => {
    
    const filtro = btn.dataset.filter;

    // attivo visivo
    filtri.forEach(b => b.classList.remove('attivo'));
    btn.classList.add('attivo');

    cards.forEach(card => {
      const categoria = card.dataset.categoria;

      if (filtro === "tutti" || categoria === filtro) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

  });
});
