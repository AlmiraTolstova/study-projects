// ●Реализовать формы регистрации и логина.
// ●Данные зарегистрированных пользователей хранить в массиве объектов
// в localStorage.
// ●Для обеих форм сделать проверку на пустые поля при отправке.
// ●При вводе неверного логина или пароля выводить сообщение об ошибке.
// ●При успешном логине и регистрации выводит сообщение и очищать поля.

// 1) Валидация login: обязательное поле, от 2 - 16 символов,
//  уникальное значение. 2) Валидация password: обязательное поле,
//  от 8 символов, обязательное использование как минимум одного
//  спец. символа("!"".", "&")

// Имя {
//  Минимум 2 символа
//  Максимум 24 символа
//  Только буквы
// }
// Эмейл {
//  Наличие символа@
//  Минимум 7 символов
// }
// Телефон {
//  Первый символ +
//  Максимум 12 чисел
//  Минимум 8 чисел
//  Только числа
// }
// Пароль {
//  Минимум 5 символов
//  максимум 26 символов
//  Спец символы ["!", ".", "&"]
// }

const registerForm = document.querySelector("#register-form");
const message = document.querySelector("#message");
const users = JSON.parse(localStorage.getItem("users")) || [];

// Проверяем, что email уникален
function isEmailUnique(value, list) {
  return !list.some((user) => user.email === value);
}

// Валидация имени
function validateName(value) {
  if (value === "") return "Введите имя!";
  if (value.length < 2 || value.length > 24)
    return "Имя должно содержать от 2 до 24 символов!";
  if (!/^[а-яА-Яa-zA-Z]+$/.test(value))
    return "Имя должно содержать только буквы!";
  return "";
}

// Валидация телефона
function validatePhone(value) {
  if (!value) return "Введите номер телефона!";
  if (value[0] !== "+") return "Телефон должен начинаться с +";
  const numbers = value.slice(1);
  if (!/^\d+$/.test(numbers)) return "Телефон должен содержать только цифры!";
  if (numbers.length < 8 || numbers.length > 12)
    return "Телефон должен содержать от 8 до 12 цифр после +";
  return "";
}

// Валидация email
function validateEmail(value, list) {
  if (!value) return "Введите email!";
  if (value.length < 7) return "Email должен содержать минимум 7 символов!";
  if (!value.includes("@")) return "Email должен содержать символ @";
  if (!isEmailUnique(value, list))
    return "Пользователь с таким email уже существует!";
  return "";
}

// Валидация email
function validateLoginEmail(value, list) {
  if (!value) return "Введите email!";
  if (value.length < 7) return "Email должен содержать минимум 7 символов!";
  if (!value.includes("@")) return "Email должен содержать символ @";
  return "";
}

//  Валидация пароля
function validatePassword(value) {
  if (!value) {
    return "Введите пароль!";
  }
  if (value.length < 8) {
    return "Пароль должен содержать минимум 8 символов!";
  }
  if (!/[!."&]/.test(value)) {
    return 'Пароль должен содержать хотя бы один из символов: ! . " &';
  }
  return "";
}

//  Функция для подсветки полей
function highlightField(input, isValid) {
  if (isValid) {
    input.style.borderColor = "green";
  } else {
    input.style.borderColor = "red";
  }
}

// Обработка формы
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = event.target.elements["name"];
  const phoneInput = event.target.elements["phone"];
  const emailInput = event.target.elements["email"];
  const passwordInput = event.target.elements["password"];

  // Проверка значений
  const nameError = validateName(nameInput.value);
  const phoneError = validatePhone(phoneInput.value);
  const emailError = validateEmail(emailInput.value, users);
  const passwordError = validatePassword(passwordInput.value);

  // Подсветка полей
  highlightField(nameInput, !nameError);
  highlightField(phoneInput, !phoneError);
  highlightField(emailInput, !emailError);
  highlightField(passwordInput, !passwordError);

  if (nameError) {
    message.textContent = nameError;
    message.style.color = "red";
    return;
  }

  if (phoneError) {
    message.textContent = phoneError;
    message.style.color = "red";
    return;
  }

  if (emailError) {
    message.textContent = emailError;
    message.style.color = "red";
    return;
  }

  if (passwordError) {
    message.textContent = passwordError;
    message.style.color = "red";
    return;
  }

  const newUser = {
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Регистрация успешна!";
  message.style.color = "green";

  // Очистка формы
  nameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
});

const authorisationForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

// Обработка формы2
authorisationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = event.target.elements["email"];
  const passwordInput = event.target.elements["password"];

  // Проверка значений
  const emailError = validateLoginEmail(emailInput.value, users);
  const passwordError = validatePassword(passwordInput.value);

  // Подсветка полей
  highlightField(emailInput, !emailError);
  highlightField(passwordInput, !passwordError);

  if (emailError) {
    loginMessage.textContent = emailError;
    loginMessage.style.color = "red";
    return;
  }

  if (passwordError) {
    loginMessage.textContent = passwordError;
    loginMessage.style.color = "red";
    return;
  }

  //Проверка данных пользователя
  const foundUser = users.filter((item) => {
    if (
      item.email === emailInput.value &&
      item.password === passwordInput.value
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (foundUser.length > 0) {
    loginMessage.textContent = "Авторизация успешна!";
    loginMessage.style.color = "blue";
  } else {
    loginMessage.textContent =
      "Данные неверны или учетная запись не существует!";
    loginMessage.style.color = "red";
  }
});
