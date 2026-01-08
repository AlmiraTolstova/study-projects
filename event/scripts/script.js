const slider = document.querySelector("#slider");
const scrollAmount = 308; // ширина карточки + gap

slider.addEventListener("click", (e) => {
  const rect = slider.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const zone = rect.width * 0.15;

  if (clickX < zone) {
    slider
      .querySelector(".slider")
      .scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }

  if (clickX > rect.width - zone) {
    slider
      .querySelector(".slider")
      .scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
});
