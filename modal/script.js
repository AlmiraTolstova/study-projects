const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");

// const toggleModalWindow = () => {
//   modal.classList.toggle("modalHidden");
// };
// openModalBtn.addEventListener("click", toggleModalWindow);
// modal.addEventListener("click", toggleModalWindow);
// modalBody.addEventListener("click", (e) => e.stopPropagation());

// close via esc
// close via btn(close icon)
const toggleModalWindow = () => {
  modal.classList.toggle("modalHidden");
};

openModalBtn.addEventListener("click", toggleModalWindow);
modal.addEventListener("click", toggleModalWindow);

modalBody.addEventListener("click", (e) => e.stopPropagation());
closeModalBtn.addEventListener("click", toggleModalWindow);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("modalHidden")) {
    toggleModalWindow();
  }
});
