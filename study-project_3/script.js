// 1 этап: верстка, 2 этап: добавление задачи,
// 3 этап: фильтрация,
//  редактирование
// доп. функ: поиск,
// редактирование задачи(название, время)

//Strukture
// task(entity) {
//   id: String | Number, // Math.random() | Date.now()
//   title: String,
//   date: String | Number,
//   completed: Boolean // false
// }
//TASKS
// const tasks = [
//   {
//     id: 1,
//     title: "Learn React",
//     data: "10:30 12.12.2025",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Learn MUI",
//     data: "10:30 12.12.2025",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Learn Antd",
//     data: "10:30 12.12.2025",
//     completed: false,
//   },

//   {
//     id: 3,
//     title: "Learn Antd",
//     data: "10:30 12.12.2025",
//     completed: true,
//   },
// ];

// Текущая выбранная вкладка: "all" / "active" / "done"
let selectedView = "all";

// Строка поиска
let selectedInputSearch = "";

// Списки для отображения даты
const listOfDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const listOfMonths = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

// Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Элементы DOM для даты
const dayWeek = document.querySelector(".day");
const date = document.querySelector(".date");

// При загрузке страницы устанавливаем дату и отображаем список задач
window.addEventListener("load", () => {
  dayWeek.textContent = listOfDays[new Date().getDay()];
  date.textContent =
    new Date().getDate() + " " + listOfMonths[new Date().getMonth()];
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

// Контейнер для списка задач
const listOfTasks = document.querySelector(".tasks-list");

//Функция отрисовки списка задач
function renderTasksList(
  arr,
  containerListOfTasks,
  filterValue,
  inputFilterSearch = ""
) {
  containerListOfTasks.innerHTML = ""; // Очищаем список перед рендером
  let filteredArr = [];
  // Фильтрация по вкладкам
  if (filterValue === "all") {
    filteredArr = arr;
  } else if (filterValue === "active") {
    filteredArr = arr.filter((elem) => {
      return elem.completed === false;
    });
  } else if (filterValue === "done") {
    filteredArr = arr.filter((elem) => {
      return elem.completed === true;
    });
  }
  // Фильтр по поиску
  if (inputFilterSearch !== "") {
    filteredArr = filteredArr.filter((elem) => {
      return elem.title.includes(inputFilterSearch);
    });
  }
  // Рисуем каждый элемент
  filteredArr.forEach((element) => {
    const divTask = document.createElement("div");
    divTask.classList.add("task");

    // Добавляем класс "done", если задача выполнена
    if (element.completed === true) {
      divTask.classList.add("done");
    }

    const elementLabel = document.createElement("label");

    // Checkbox выполнения задачи
    const chekboxDone = document.createElement("input");
    chekboxDone.type = "checkbox";
    chekboxDone.checked = element.completed === true ? true : false;

    chekboxDone.addEventListener("click", () => {
      // Переключаем completed
      element.completed = !element.completed;

      if (element.completed) {
        spanTitle.classList.add("done-text");
      } else {
        spanTitle.classList.remove("done-text");
      }

      if (element.completed) {
        // переносим задачу в конец
        tasks = tasks.filter((t) => t.id !== element.id);
        tasks.push(element);
      } else {
        // переносим в начало (если нужно вернуть наверх)
        tasks = tasks.filter((t) => t.id !== element.id);
        tasks.unshift(element);
      }

      // Сохраняем новые данные в localStorage
      updateStorage();

      // Перерисовываем список
      renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
    });

    // Добавляем checkbox в label
    elementLabel.appendChild(chekboxDone);

    // Создаём блок task-info
    const divTaskInfo = document.createElement("div");
    divTaskInfo.classList.add("task-info");

    const spanTime = document.createElement("span");
    spanTime.classList.add("time");
    spanTime.textContent = element.data;
    divTaskInfo.appendChild(spanTime);

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("title");
    spanTitle.textContent = element.title;
    divTaskInfo.appendChild(spanTitle);
    elementLabel.appendChild(divTaskInfo);

    divTask.appendChild(elementLabel);

    containerListOfTasks.appendChild(divTask);
  });
}

// Кнопки фильтрации
const btnAll = document.querySelector("#btnAll");
const btnActive = document.querySelector("#btnActive");
const btnDone = document.querySelector("#btnDone");

btnAll.addEventListener("click", () => {
  selectedView = "all";
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

btnActive.addEventListener("click", () => {
  selectedView = "active";
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

btnDone.addEventListener("click", () => {
  selectedView = "done";
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

// Модальное окно добавления задачи
const floatingBtn = document.querySelector(".floating-btn");
const modalAddTask = document.querySelector(".modal");
const formAddBtn = document.querySelector("#formAddBtn");
const formCancelBtn = document.querySelector("#formCancelBtn");
const inputDescribeTask = document.querySelector("#inputDescribeTask");
const datePicker = document.querySelector("#datePicker");

// Открыть модалку
floatingBtn.addEventListener("click", () => {
  modalAddTask.classList.remove("modal-unvisible");
});

// Добавление новой задачи
formAddBtn.addEventListener("click", () => {
  const newInputDescribeTask = inputDescribeTask.value;
  const newDatePicker = datePicker.value;
  // Добавляем задачу в массив
  tasks.push({
    id: tasks.length + 1,
    title: newInputDescribeTask,
    data: newDatePicker,
    completed: false,
  });
  updateStorage();

  modalAddTask.classList.add("modal-unvisible");
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

// Закрыть модалку
formCancelBtn.addEventListener("click", () => {
  modalAddTask.classList.add("modal-unvisible");
});

// Функция обновления localStorage
const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Поиск по задачам
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  selectedInputSearch = searchInput.value;
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});
