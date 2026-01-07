# Создайте веб-приложение для поиска и просмотра информации о фильмах. Пользователь может искать фильмы, фильтровать их по жанрам, смотреть детальную информацию и сохранять понравившиеся в избранное.

Основной интерфейс:

x - Шапка с поиском:
x - Поле ввода для поиска фильмов по названию
x - Кнопка "Найти"
Ссылка "Избранное" (счетчик)

Боковая панель фильтров:
x - Фильтр по жанрам (чекбоксы): драма, комедия, боевик, фантастика

"Action, Adventure, Fantasy"
, Horror, Sci-Fi"
"Animation, Drama, Comedy, Crime,Sport"

x- Фильтр по году (от и до)
x - Фильтр по рейтингу IMDb (от 0 до 10)
x - Кнопка "Сбросить фильтры"

Основная область:
Сетка карточек фильмов
Счетчик найденных фильмов: "Найдено 24 фильма"new
Кнопка "Показать еще" (подгрузка следующих фильмов) \*\*

x - Каждая карточка содержит:
x - Постер фильма (изображение)
x - Название фильма
x - Год выпуска
x - Жанры (теги)
x - Рейтинг IMDb (звезды или число)
x - Короткое описание (первые 100 символов)
x - Кнопка "Подробнее"
x - Кнопка "Добвить в избранное"

x - При клике "Подробнее" показывается:
x - Большой постер
x - Полное название
x - Режиссер
x - Актёры (основные)
x - Полное описание
x - Длительность фильма
x - Рейтинг
x - Кнопка "Трейлер" (открывает YouTube в новом окне)
x - Кнопка "Назад к списку"

x - Страница "Избранное":
x - Отдельная страница/вкладка
x - Список фильмов, добавленных в избранное
x - Возможность удалить из избранного
x - Сохранение в LocalStorage

x - Используйте OMDb API (The Open Movie Database):
Бесплатный ключ: можно получить на omdbapi.com (1000 запросов в день)
Поиск фильма: http://www.omdbapi.com/?s=avatar&apikey=ваш_ключ
Детали фильма: http://www.omdbapi.com/?i=tt0499549&apikey=ваш_ключ

Состояния интерфейса:
x - Загрузка: показывает спиннер при поиске
x - Пустой результат: "Фильмы не найдены, попробуйте изменить запрос"
x - Ошибка: "Произошла ошибка при загрузке данных"
Пустое избранное: "Вы еще не добавили ни одного фильма в избранное"

Дополнительные возможности:
Сортировка: по году, рейтингу, названию
Пагинация: постраничный вывод
Тёмная тема
Экспорт избранного в JSON
Случайный фильм (кнопка "Мне повезет!")

    Пример данных фильма:
    {
    "Title": "Inception",
    "Year": "2010",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Christopher Nolan",
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    "Plot": "A thief who steals corporate secrets...",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "Runtime": "148 min"
    }

{
"Title": "Bundles Lorem Ipsum",
"Year": "2018",
"Rated": "N/A",
"Released": "25 Dec 2018",
"Runtime": "N/A",
"Genre": "Short, Music",
"Director": "Michael Cimpher",
"Writer": "N/A",
"Actors": "Andy Allen, Michael Cimpher",
"Plot": "N/A",
"Language": "English",
"Country": "United States",
"Awards": "N/A",
"Poster": "N/A",
"Ratings": [],
"Metascore": "N/A",
"imdbRating": "N/A",
"imdbVotes": "N/A",
"imdbID": "tt12030312",
"Type": "movie",
"DVD": "N/A",
"BoxOffice": "N/A",
"Production": "N/A",
"Website": "N/A",
"Response": "True"
}

{
"Title": "Star Wars: Episode IV - A New Hope",
"Year": "1977",
"imdbID": "tt0076759",
"Type": "movie",
"Poster": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg",

"fullInfo": {
"Title": "Star Wars: Episode IV - A New Hope",
"Year": "1977",
"Rated": "PG",
"Released": "25 May 1977",
"Runtime": "121 min",
"Genre": "Action, Adventure, Fantasy",
"Director": "George Lucas",
"Writer": "George Lucas",
"Actors": "Mark Hamill, Harrison Ford, Carrie Fisher",
"Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth ...",
"Language": "English",
"Country": "United States",
"Awards": "Won 6 Oscars. 70 wins & 31 nominations total",
"Poster": "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_SX300.jpg",
"Ratings": [
{
"Source": "Internet Movie Database",
"Value": "8.6/10"
},
{
"Source": "Rotten Tomatoes",
"Value": "94%"
},
{
"Source": "Metacritic",
"Value": "90/100"
}
],
"Metascore": "90",
"imdbRating": "8.6",
"imdbVotes": "1,544,658",
"imdbID": "tt0076759",
"Type": "movie",
"DVD": "N/A",
"BoxOffice": "$460,998,507",
"Production": "N/A",
"Website": "N/A",
"Response": "True"
}
}
