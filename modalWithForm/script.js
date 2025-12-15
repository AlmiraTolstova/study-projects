const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");
const cancelBtn = document.querySelector(".cancelBtn");

const toggleModal = () => {
  modal.classList.toggle("modalHidden");
};

// открыть
openModalBtn.addEventListener("click", toggleModal);

// закрыть по клику на фон
modal.addEventListener("click", toggleModal);

// запрет закрытия при клике внутри окна
modalBody.addEventListener("click", (e) => e.stopPropagation());

// закрыть по icon
closeModalBtn.addEventListener("click", toggleModal);

// закрыть по кнопке "Отмена"
cancelBtn.addEventListener("click", toggleModal);

// закрыть по Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("modalHidden")) {
    toggleModal();
  }
});
