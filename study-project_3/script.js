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
let selectedView = "all";
let selectedInputSearch = "";

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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//set DATE
const dayWeek = document.querySelector(".day");
const date = document.querySelector(".date");

window.addEventListener("load", () => {
  dayWeek.textContent = listOfDays[new Date().getDay()];
  date.textContent =
    new Date().getDate() + " " + listOfMonths[new Date().getMonth()];
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});

const listOfTasks = document.querySelector(".tasks-list");

function renderTasksList(
  arr,
  containerListOfTasks,
  filterValue,
  inputFilterSearch = ""
) {
  containerListOfTasks.innerHTML = ""; // Очищаем список перед рендером
  let filteredArr = [];
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
  if (inputFilterSearch !== "") {
    filteredArr = filteredArr.filter((elem) => {
      return elem.title.includes(inputFilterSearch);
    });
  }
  filteredArr.forEach((element) => {
    //---------<div class="task done">------------//
    const divTask = document.createElement("div");
    divTask.classList.add("task");
    if (element.completed === true) {
      divTask.classList.add("done");
    }
    //---------<label>----------------------------//
    const elementLabel = document.createElement("label");
    //---------<input type="checkbox"-------------//
    const chekboxDone = document.createElement("input");
    chekboxDone.type = "checkbox";
    chekboxDone.checked = element.completed === true ? true : false;
    chekboxDone.addEventListener("click", () => {
      element.completed = !element.completed;
      updateStorage();
      renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
    });
    elementLabel.appendChild(chekboxDone);
    //---------<div task-info>-------------//
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

const floatingBtn = document.querySelector(".floating-btn");
const modalAddTask = document.querySelector(".modal");
const formAddBtn = document.querySelector("#formAddBtn");
const formCancelBtn = document.querySelector("#formCancelBtn");
const inputDescribeTask = document.querySelector("#inputDescribeTask");
const datePicker = document.querySelector("#datePicker");

floatingBtn.addEventListener("click", () => {
  modalAddTask.classList.remove("modal-unvisible");
});

formAddBtn.addEventListener("click", () => {
  const newInputDescribeTask = inputDescribeTask.value;
  const newDatePicker = datePicker.value;
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
formCancelBtn.addEventListener("click", () => {
  modalAddTask.classList.add("modal-unvisible");
});

const updateStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  selectedInputSearch = searchInput.value;
  renderTasksList(tasks, listOfTasks, selectedView, selectedInputSearch);
});
