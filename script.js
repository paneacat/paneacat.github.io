const cards = document.querySelectorAll(".archivio-grid .card");
const btn = document.getElementById("loadMoreBtn");

let visible = 6;

// stato iniziale
cards.forEach((card, index) => {
  if (index >= visible) {
    card.classList.add("hidden");
    card.style.display = "none";
  } else {
    card.classList.add("show");
  }
});

btn.addEventListener("click", () => {
  let newVisible = visible + 6;

  cards.forEach((card, index) => {
    if (index >= visible && index < newVisible) {
      card.style.display = "block";

      // piccolo delay per animazione smooth
      setTimeout(() => {
        card.classList.remove("hidden");
        card.classList.add("show");
      }, 50 * (index - visible));
    }
  });

  visible = newVisible;

  if (visible >= cards.length) {
    btn.style.display = "none";
  }
});
