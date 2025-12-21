function createOrder(e) {
  e.preventDefault();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Данные получены");
    }, 2000);
  });
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  // дожидаемся ответа бэкенда
  await createOrder(e);
  const notificationsContainer = document.querySelector(
    "#notificationsContainer"
  );
  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    // вызываем конструктор уведомлений
    constructNotification(
      "Заказ создан",
      "Ожидайте дальнейшей информации",
      "success"
    )
  );
  const buttonsContainer = document.querySelector("#buttons");
  buttonsContainer.classList.remove("buttons--hidden");
});

// функция получения иконок в зависимости от статуса
const getNotificationError = (type) => {
  switch (type) {
    case "success":
      return "<span class='material-symbols-rounded'> done </span>";
    case "info":
      return "<span class='material-symbols-rounded'>info</span>";
    case "error":
      return "<span class='material-symbols-rounded'>error</span>";
    default:
      return "<span class='material-symbols-rounded'> done </span>";
  }
};
const constructNotification = (title, text, type) => {
  // возвращаем строку, содержащую разметку уведомления
  const notification = `
    <div class="notification notification--${type}">
    <div class="notification__icon">
    <span class="material-symbols-rounded"> 
        <i class="bi bi-check-lg"></i>
    </span>
    </div>
    <div class="notification__data">
    <div class="notification__title">${title}</div>
    <div class="notification__text">${text}</div>
    </div>
    <span class="material-symbols-rounded notification__close" onclick="closeNotification(this)">
        <i class="bi bi-x-circle-fill"></i>
    </span>
    </div>
`;
  return notification;
};

const closeNotification = (notification) => {
  console.log(notification);
  notification.parentElement.classList.toggle("notification--hidden");
  setTimeout(() => {
    notification.parentElement.remove();
  }, 300);
};

document.querySelector("#buttonPaid").addEventListener("click", () => {
  const notificationsContainer = document.getElementById(
    "notificationsContainer"
  );
  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification("Заказ оплачен", "Ожидайте отправки", "info")
  );
});
document.querySelector("#buttonSent").addEventListener("click", () => {
  const notificationsContainer = document.getElementById(
    "notificationsContainer"
  );
  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification("Заказ отправлен", "Ожидайте курьера", "info")
  );
});
document.querySelector("#buttonGet").addEventListener("click", () => {
  const notificationsContainer = document.getElementById(
    "notificationsContainer"
  );
  notificationsContainer.insertAdjacentHTML(
    "afterbegin",
    constructNotification("Заказ получен", "Ждем вас снова!", "info")
  );
});

// const constructNotification = (title, text, type) => {
//   const notification = `
// <div
// class="notification notification--${type}">
// <div class="notification__icon">
// <span class="material-symbols-rounded"> done </span>
// </div>
// <div class="notification__data">
// <div class="notification__title">${title}</div>
// <div class="notification__text">${text}</div>
// </div>
// <span class="material-symbols-rounded notification__close"
// onclick="closeNotification(
// this
// )">
// close_small
// </span>
// </div>
// `;
//   return notification;
// };
