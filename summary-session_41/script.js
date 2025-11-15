// Разделить логин и регистрацию на экраны с возможностью перехода по страницам,
// а также добавить экран профиля где после логина нужно отображать имя пользователя,
//  почту пользователя, кнопки выйти и удалить аккаунт. К объекту пользователя добавить
//  поле token (необходимо сгенерировать при создании пользователя любым способом,
// например, Math.random()). При авторизации пользователя его токен необходимо
// сохранять в localStorage отдельным полем authToken.
//  При перезагрузки страницы нужно проверить наличие этого токена в хранилище,
// в зависимости от этого показывать его акаунт или отправлять на страницу логина.
//  При клике на кнопку удалить аккаунт - удалять authToken и объект пользователя из
//  массива объектов в хранилище и переводить на страницу регистрации.
//  При клике на кнопку выйти из аккаунта - удалять authToken и переводить на
//  страницу логина.

// {
//   name: "...",
//   email: "...",
//   password: "...",
//   phone: "...",
//   token: "k9j34j2l3j4..."
// }

// localStorage.setItem("authToken", user.token);

// Определяем текущую страницу
const path = window.location.pathname;

// Все пользователи
let users = JSON.parse(localStorage.getItem("users")) || [];

// Активный токен (если есть)
let authToken = localStorage.getItem("authToken");

// Найти пользователя по токену
function getUserByToken(token) {
  return users.find((u) => u.token === token) || null;
}

// Если токен есть — авторизовать
let activeUser = authToken ? getUserByToken(authToken) : null;

// Валидация
function isEmailUnique(value, list) {
  return !list.some((user) => user.email === value);
}

function validateName(value) {
  if (!value) return "Введите имя!";
  if (value.length < 2 || value.length > 24)
    return "Имя должно быть от 2 до 24 символов.";
  if (!/^[а-яА-Яa-zA-Z]+$/.test(value))
    return "Имя может содержать только буквы.";
  return "";
}

function validatePhone(value) {
  if (!value) return "Введите номер!";
  if (value[0] !== "+") return "Телефон должен начинаться с +";
  const numbers = value.slice(1);
  if (!/^\d+$/.test(numbers)) return "Телефон должен содержать только цифры!";
  if (numbers.length < 8 || numbers.length > 12)
    return "Телефон должен содержать 8–12 цифр после +";
  return "";
}

function validateEmail(value, list) {
  if (!value) return "Введите email!";
  if (value.length < 7) return "Email должен быть минимум 7 символов!";
  if (!value.includes("@")) return "Email должен содержать @";
  if (!isEmailUnique(value, list)) return "Такой email уже зарегистрирован!";
  return "";
}

function validateLoginEmail(value) {
  if (!value) return "Введите email!";
  if (value.length < 7) return "Email слишком короткий!";
  if (!value.includes("@")) return "Email должен содержать @";
  return "";
}

function validatePassword(value) {
  if (!value) return "Введите пароль!";
  if (value.length < 8) return "Пароль минимум 8 символов!";
  if (!/[!."&]/.test(value))
    return 'Пароль должен содержать спец символ (! . " &)';
  return "";
}

function highlightField(input, ok) {
  input.style.borderColor = ok ? "green" : "red";
}

// Регистрация

if (path.includes("register.html")) {
  // Если уже авторизован - перекинуть в профиль
  if (activeUser) window.location.href = "profile.html";

  const form = document.querySelector("#register-form");
  const message = document.querySelector("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name;
    const phone = form.phone;
    const email = form.email;
    const password = form.password;

    const nameError = validateName(name.value);
    const phoneError = validatePhone(phone.value);
    const emailError = validateEmail(email.value, users);
    const passwordError = validatePassword(password.value);

    highlightField(name, !nameError);
    highlightField(phone, !phoneError);
    highlightField(email, !emailError);
    highlightField(password, !passwordError);

    if (nameError || phoneError || emailError || passwordError) {
      message.textContent =
        nameError || phoneError || emailError || passwordError;
      message.style.color = "red";
      return;
    }

    // Генерация токена
    const token = Math.random().toString(36).slice(2);

    const newUser = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      token: token,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Регистрация успешна!";
    message.style.color = "green";

    // Очистить форму
    name.value = phone.value = email.value = password.value = "";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 500);
  });
}

// Логин

if (path.includes("login.html")) {
  // Если уже авторизован — в профиль
  if (activeUser) window.location.href = "profile.html";

  const form = document.querySelector("#login-form");
  const loginMessage = document.querySelector("#login-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const emailError = validateLoginEmail(email);
    const passwordError = validatePassword(password);

    highlightField(form.email, !emailError);
    highlightField(form.password, !passwordError);

    if (emailError || passwordError) {
      loginMessage.textContent = emailError || passwordError;
      loginMessage.style.color = "red";
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      loginMessage.textContent = "Неверный email или пароль!";
      loginMessage.style.color = "red";
      return;
    }

    // Устанавливаем токен авторизации
    localStorage.setItem("authToken", user.token);

    window.location.href = "profile.html";
  });
}

// Профиль
if (path.includes("profile.html")) {
  // Если нет токена — отправить на логин
  if (!activeUser) {
    window.location.href = "login.html";
  }

  // Заполнение данных
  document.querySelector("#profile-name").textContent = activeUser.name;
  document.querySelector("#profile-email").textContent = activeUser.email;

  // Выйти из аккаунта
  document.querySelector("#logout-btn").onclick = () => {
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  };

  // Удалить аккаунт
  document.querySelector("#delete-btn").onclick = () => {
    if (!confirm("Удалить аккаунт?")) return;

    // Удаляем пользователя из массива
    users = users.filter((u) => u.token !== activeUser.token);
    localStorage.setItem("users", JSON.stringify(users));

    // Удаляем токен
    localStorage.removeItem("authToken");

    alert("Аккаунт удалён!");

    window.location.href = "register.html";
  };
}
