const BASE_URL = "https://jsonplaceholder.typicode.com/";

function fetchUsers() {
  return fetch(`${BASE_URL}/users`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

const usersList = [];
const todosList = [];
const listOfTasks = document.querySelector(".tasks-list");

// Текущая выбранная вкладка: "all" / "active" / "done"
let selectedView = "all";
// Список смерженных задач
let mergedTasks = [];
// Строка поиска
let selectedInputSearch = "";
// фильтр по юзеру
let selectedUserIdForFilter = "all";

function mergeTodosWithUsers(users, todos) {
  let resultArray = [];
  users.forEach((user) => {
    const tasksForUsers = todos.filter((item) => {
      return item.userId === user.id;
    });
    tasksForUsers.forEach((task) => {
      resultArray.push({
        todoId: task.id,
        title: task.title,
        completed: task.completed,
        userId: user.id,
        name: user.name,
        email: user.email,
      });
    });
  });
  return resultArray;
}

// функция, которая фильтрует массив задач согласно
// списку фильтров
function useCombainFilter(
  mergedData,
  filterValue,
  inputFilterSearch = "",
  selectedUserFilter
) {
  let filteredArr = [];
  // Фильтрация по вкладкам
  if (filterValue === "all") {
    filteredArr = mergedData;

    filteredArr.forEach((element) => {
      if (element.completed) {
        // переносим задачу в конец
        filteredArr = filteredArr.filter(
          (item) => item.todoId !== element.todoId
        );
        filteredArr.push(element);
      } else {
        // переносим в начало (если нужно вернуть наверх)
        filteredArr = filteredArr.filter(
          (item) => item.todoId !== element.todoId
        );
        filteredArr.unshift(element);
      }
    });
  } else if (filterValue === "active") {
    filteredArr = mergedData.filter((elem) => {
      return elem.completed === false;
    });
  } else if (filterValue === "done") {
    filteredArr = mergedData.filter((elem) => {
      return elem.completed === true;
    });
  }
  // Фильтр по поиску
  if (inputFilterSearch !== "") {
    filteredArr = filteredArr.filter((elem) => {
      return elem.title.includes(inputFilterSearch);
    });
  }

  if (selectedUserFilter !== "all") {
    if (selectedUserFilter !== "") {
    }
    filteredArr = filteredArr.filter((elem) => {
      return elem.userId === Number(selectedUserFilter);
    });
  }
  return filteredArr;
}

function renderTodoList(
  mergedData,
  containerListOfTasks,
  filterValue,
  inputFilterSearch = "",
  selectedUserFilter
) {
  containerListOfTasks.innerHTML = ""; // Очищаем список перед рендером

  let filteredArr = [];

  filteredArr = useCombainFilter(
    mergedData,
    filterValue,
    inputFilterSearch,
    selectedUserFilter
  );

  filteredArr.forEach((element) => {
    const divTask = document.createElement("div");
    divTask.classList.add("task");

    // Добавляем класс "done", если задача выполнена
    if (element.completed === true) {
      divTask.classList.add("done");
    }

    const elementLabel = document.createElement("div");
    elementLabel.classList.add("task-container");

    // Checkbox выполнения задачи
    const chekboxDone = document.createElement("input");
    chekboxDone.type = "checkbox";
    chekboxDone.checked = element.completed === true ? true : false;

    // Добавляем checkbox в label
    elementLabel.appendChild(chekboxDone);

    // Создаём блок task-info
    const divTaskInfo = document.createElement("div");
    divTaskInfo.classList.add("task-info");

    const spanUserName = document.createElement("span");
    spanUserName.classList.add("title");
    spanUserName.textContent = element.name;
    divTaskInfo.appendChild(spanUserName);

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("title");
    spanTitle.textContent = element.title;
    divTaskInfo.appendChild(spanTitle);

    const spanUserEmail = document.createElement("span");
    spanUserEmail.classList.add("title");
    spanUserEmail.textContent = element.email;
    divTaskInfo.appendChild(spanUserEmail);

    elementLabel.appendChild(divTaskInfo);
    divTask.appendChild(elementLabel);

    containerListOfTasks.appendChild(divTask);
  });
  calculateStatistic(
    filteredArr,
    filterValue,
    inputFilterSearch,
    selectedUserFilter
  );
}

// Кнопки фильтрации
const btnAll = document.querySelector("#btnAll");
const btnActive = document.querySelector("#btnActive");
const btnDone = document.querySelector("#btnDone");

function setActiveTab(button) {
  // убираем active у всех
  btnAll.classList.remove("active");
  btnActive.classList.remove("active");
  btnDone.classList.remove("active");

  // добавляем только выбранной
  button.classList.add("active");
}

btnAll.addEventListener("click", () => {
  selectedView = "all";
  setActiveTab(btnAll);
  // меняем иконки
  btnAll.querySelector(".material-symbols-outlined").textContent = "check";
  btnActive.querySelector(".material-symbols-outlined").textContent = "";
  btnDone.querySelector(".material-symbols-outlined").textContent = "";
  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});

btnActive.addEventListener("click", () => {
  selectedView = "active";
  setActiveTab(btnActive);
  // меняем иконки
  btnAll.querySelector(".material-symbols-outlined").textContent = "";
  btnActive.querySelector(".material-symbols-outlined").textContent = "check";
  btnDone.querySelector(".material-symbols-outlined").textContent = "";

  // btnActive.classList.add("active");
  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});

btnDone.addEventListener("click", () => {
  selectedView = "done";
  setActiveTab(btnDone);
  // меняем иконки
  btnAll.querySelector(".material-symbols-outlined").textContent = "";
  btnActive.querySelector(".material-symbols-outlined").textContent = "";
  btnDone.querySelector(".material-symbols-outlined").textContent = "check";

  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});

// Поиск по задачам
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  selectedInputSearch = searchInput.value;
  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});

const userFilter = document.querySelector("#userFilter");
// Фильтр по пользователю
function makeUsersfilter(users, selectusers) {
  users.forEach((item) => {
    const opt1 = document.createElement("option");

    opt1.value = item.id;
    opt1.text = item.name;
    selectusers.add(opt1);
  });
}

userFilter.addEventListener("change", (event) => {
  selectedUserIdForFilter = event.target.value;
  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});
Promise.allSettled([fetchUsers(), fetchTodos()]).then((result) => {
  //   console.log(result);

  makeUsersfilter(result[0].value, userFilter);
  mergedTasks = mergeTodosWithUsers(result[0].value, result[1].value);

  renderTodoList(
    mergedTasks,
    listOfTasks,
    selectedView,
    selectedInputSearch,
    selectedUserIdForFilter
  );
});

function calculateStatistic(
  mergedTasks,
  filterValue,
  inputFilterSearch,
  selectedUserFilter
) {
  let filteredArr = useCombainFilter(
    mergedTasks,
    filterValue,
    inputFilterSearch,
    selectedUserFilter
  );
  let allTasksCount = mergedTasks.length;
  let filteredArrDoneTasksCount = useCombainFilter(
    mergedTasks,
    "done",
    inputFilterSearch,
    selectedUserFilter
  ).length;
  let filteredArrActiveTasksCount = useCombainFilter(
    mergedTasks,
    "active",
    inputFilterSearch,
    selectedUserFilter
  ).length;
  statData = [
    ["Task", "Count"],
    ["Done", filteredArrDoneTasksCount],
    ["Active", filteredArrActiveTasksCount],
  ];
  drawGoogleChart(statData);
}

function drawGoogleChart(statData) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(statData);

    var options = {
      title: "My Daily Activities",
      pieHole: 0.5,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    chart.draw(data, options);
  }
}
