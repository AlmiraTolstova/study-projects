const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const form = document.querySelector("#registerForm");
const errors = document.querySelectorAll(".error");
const inputs = document.querySelectorAll("input");
const serverMessage = document.querySelector(".serverMessage");

const submitBtn = document.querySelector(".submitBtn");
const btnText = document.querySelector(".submitBtn");
const loader = document.querySelector(".loaderOverlay");

const toggleModal = () => {
  modal.classList.toggle("modalHidden");
};

openModalBtn.addEventListener("click", toggleModal);
modal.addEventListener("click", toggleModal);
modalBody.addEventListener("click", (e) => e.stopPropagation());
closeModalBtn.addEventListener("click", toggleModal);
cancelBtn.addEventListener("click", toggleModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("modalHidden")) {
    toggleModal();
  }
});

const clearErrors = () => {
  errors.forEach((err) => (err.textContent = ""));
  inputs.forEach((err) => err.classList.remove("input-error"));
  serverMessage.textContent = "";
  serverMessage.className = "serverMessage";
};

let isValid = true;

function checkFields(formData) {
  isValid = true;
  const data = {
    username: formData.get("username")?.trim(),
    email: formData.get("email")?.trim(),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName")?.trim(),
    lastName: formData.get("lastName")?.trim(),
    age: Number(formData.get("age")),
    terms: document.querySelector("#terms").checked,
  };

  if (!data.username) {
    errors[0].textContent = "Обязательное поле";
    inputs[0].classList.add("input-error");
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors[1].textContent = "Некорректный email";
    inputs[1].classList.add("input-error");
    isValid = false;
  }

  if (data.password.length < 6) {
    errors[2].textContent = "Минимум 6 символов";
    inputs[2].classList.add("input-error");
    isValid = false;
  }

  if (data.password !== data.confirmPassword) {
    errors[3].textContent = "Пароли не совпадают";
    inputs[3].classList.add("input-error");
    isValid = false;
  }

  if (!data.firstName) {
    errors[4].textContent = "Обязательное поле";
    inputs[4].classList.add("input-error");
    isValid = false;
  }

  if (!data.lastName) {
    errors[5].textContent = "Обязательное поле";
    inputs[5].classList.add("input-error");
    isValid = false;
  }

  if (data.age < 18 || data.age > 100) {
    errors[6].textContent = "Возраст от 18 до 100";
    inputs[6].classList.add("input-error");
    isValid = false;
  }

  if (!data.terms) {
    errors[7].textContent = "Необходимо согласие";
    inputs[7].classList.add("input-error");
    isValid = false;
  }
  if (isValid === false) {
    submitBtn.disabled = true;
  } else submitBtn.disabled = false;
}

form.addEventListener("change", function () {
  const formData = new FormData(form);
  clearErrors();
  checkFields(formData);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(form);

  checkFields(formData);
  const data = {
    username: formData.get("username")?.trim(),
    email: formData.get("email")?.trim(),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName")?.trim(),
    lastName: formData.get("lastName")?.trim(),
    age: Number(formData.get("age")),
    terms: document.querySelector("#terms").checked,
  };
  if (!isValid) return;

  submitBtn.disabled = true;
  btnText.textContent = "Отправка...";
  loader.classList.remove("hidden");

  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
      }),
    });

    const result = await response.json();

    setTimeout(() => {
      if (!response.ok || (response.status >= 400 && response.status >= 499)) {
        switch (response.status) {
          case 400:
            errors[0].textContent = "Bad request: " + result.message;
            break;
          case 401:
            errors[0].textContent = "Unauthorizedt: " + result.message;
            break;
          case 404:
            errors[0].textContent = "Not found: " + result.message;
            break;
          default:
            errors[0].textContent = result.message || "Ошибка регистрации";
        }

        return;
      }
      if (response.status >= 200 && response.status <= 299) {
        serverMessage.textContent = "Регистрация прошла успешно!";
        serverMessage.classList.add("success");
        setTimeout(() => {
          form.reset();
          toggleModal();
          loader.classList.add("hidden");
          serverMessage.textContent = "";
          console.log(result);
          submitBtn.disabled = false;
          btnText.textContent = "Зарегистрироваться";
        }, 1000);
      }
    }, 5000);
  } catch (err) {
    console.log(err);
    serverMessage.textContent = "Ошибка соединения с сервером";
    serverMessage.classList.add("error");
    loader.classList.add("hidden");
    submitBtn.disabled = false;
    btnText.textContent = "Зарегистрироваться";
  }
});
