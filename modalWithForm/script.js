const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const form = document.querySelector("#registerRorm");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const age = Number(formData.get("age"));
  const termsAccepted = document.querySelector("#terms").checked;

  if (password !== confirmPassword) {
    alert("Пароли не совпадают");
    return;
  }

  if (!termsAccepted) {
    alert("Необходимо согласиться с условиями использования");
    return;
  }
  if (age < 18 || age > 100) {
    alert("Возраст должен быть от 18 до 100 лет");
    return;
  }

  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    age,
  };

  alert("Регистрация прошла успешно!");
  toggleModal();
  form.reset();
});
