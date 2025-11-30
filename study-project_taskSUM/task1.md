# Создать продвинутый менеджер задач с пользователями, фильтрацией и статистикой.

Описание:
Приложение должно загружать задачи (todos) и пользователей (users) с JSONPlaceholder, объединять эти данные и предоставлять богатый интерфейс для управления и просмотра.

Сделать параллельные запросы (используя Promise.all) к:

/todos (список задач)
/users (список пользователей)

Объединение данных:
Создать новый массив задач. Каждый элемент этого массива должен быть объектом, который включает в себя все свойства задачи (todoId, title, completed) и объект пользователя (userId, name, email), которому эта задача принадлежит.

{
"userId": 1,
"id": 1,
"title": "delectus aut autem",
"completed": false
}

{
"id": 1,
"name": "Leanne Graham",
"username": "Bret",
"email": "Sincere@april.biz",
"address": {
"street": "Kulas Light",
"suite": "Apt. 556",
"city": "Gwenborough",
"zipcode": "92998-3874",
"geo": {
"lat": "-37.3159",
"lng": "81.1496"
}
},
"phone": "1-770-736-8031 x56442",
"website": "hildegard.org",
"company": {
"name": "Romaguera-Crona",
"catchPhrase": "Multi-layered client-server neural-net",
"bs": "harness real-time e-markets"
}
}

\_>

{
"todoId": 1,
"title": "delectus aut autem",
"completed": false,
"userId": 1,
"name": "Leanne Graham",
"email": "Sincere@april.biz",
}

Отобразить объединенный список задач в виде карточек или строк таблицы. Для каждой задачи показывать: Заголовок, Статус (выполнена/не выполнена), Имя пользователя и Email.
Визуально выделить выполненные задачи (например, перечеркиванием текста или зеленым фоном).

Фильтр по статусу: Кнопки/селект "Все", "Выполненные", "Невыполненные".
Фильтр по пользователю: Выпадающий список (<select>) с именами всех пользователей.
Поиск: Поле ввода для поиска по заголовку задачи.
Все фильтры должны работать совместно.

Реализовать блок с цифровой статистикой, который обновляется при фильтрации:
"Всего задач: X"
"Выполнено: Y (Z%)"
"Осталось: K"

Код должен быть разбит на чистые функции: mergeTodosWithUsers(todos, users), renderTodoList(mergedData), calculateStatistics(todos).

API Endpoints:
https://jsonplaceholder.typicode.com/todos
https://jsonplaceholder.typicode.com/users
