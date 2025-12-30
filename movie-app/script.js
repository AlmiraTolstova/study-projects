const BASE_URL = "http://www.omdbapi.com/";

const API_KEY = "apikey=4bd1180e";

const franchiseKeywords = [
  "Star Wars",
  "Harry Potter",
  "Lord Rings",
  "Fast Furious",
  "Mission Impossible",
  "Jurassic Park",
  "Pirates Caribbean",
  "Transformers Movie",
  "Batman Dark",
  "Spider Man",
  "Avengers Endgame",
  "Iron Man",
  "Captain America",
  "Thor Ragnarok",
  "Guardians Galaxy",
  "Doctor Strange",
  "X Men",
  "Hunger Games",
  "Twilight Saga",
  "Planet Apes",
  "Matrix Reloaded",
  "Mad Max",
  "Indiana Jones",
  "James Bond",
  "Rocky Balboa",
  "Terminator Judgment",
  "Alien Resurrection",
  "Predator Hunting",
  "Toy Story",
  "Ice Age",
  "Shrek Forever",
  "Kung Fu",
  "How Train",
  "Despicable Me",
  "Cars Movie",
  "John Wick",
  "Fantastic Beasts",
  "Blade Runner",
  "Dune Part",
  "Godfather Part",
  "Saw Franchise",
];

let commonServerError = false;
let filmsList = [];
let genreFilters = [];
let globalFilterKey = false;
let ratingFilterValue = 5;

// Загружаем задачи из localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let cashedFilms = JSON.parse(localStorage.getItem("cashedFilms")) || [];

async function searchFilms(searchInput) {
  try {
    const response = await fetch(`${BASE_URL}?s=${searchInput}&${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      Response: "Error",
    };
  }
}

async function getFullInfoAboutFilmById(id) {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&plot=full&${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      Response: "Error",
    };
  }
}

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const mainContainer = document.querySelector(".main-container");
const spinner = document.querySelector(".loader");
const favoritesBtn = document.querySelector("#favoritesBtn");
const filterRun = document.querySelector("#filterRun");
const filterReset = document.querySelector("#filterReset");
const ratingFilter = document.querySelector("#ratingFilter");

function renderModalResultEmpty() {
  mainContainer.innerHTML = `     
       <div class="modalResultEmpty">
        <p>"Фильмы не найдены, попробуйте изменить запрос"</p>
      </div>`;
}

function renderModalResultError() {
  mainContainer.innerHTML = `     
       <div class="modalError">
        <p>"Произошла ошибка при загрузке данных"</p>
      </div>`;
}

window.addEventListener("load", async () => {
  updateCounter(favorites.length);
  await findAndRenderFilms(
    franchiseKeywords[
      (Math.floor(Math.random() * franchiseKeywords.length), true)
    ]
  );
  document.querySelector("#ratingFilterValue").textContent = ratingFilterValue;
});

async function findAndRenderFilms(searchInput_value, use_cased_data) {
  spinner.classList.remove("hidden");
  if (use_cased_data === false) {
    filmsList = await searchFilms(searchInput_value);
    if (filmsList.Response === "True") {
      for (const element of filmsList.Search) {
        element.fullInfo = await getFullInfoAboutFilmById(element.imdbID);
        if (element.fullInfo.Response === "Error") {
          commonServerError = true;
          renderModalResultError();
          break;
        }
      }
      if (commonServerError === false) {
        document.querySelector(
          "#filmCounter"
        ).textContent = `Found films: ${filmsList.totalResults}`;
        cashedFilms = filmsList;
        localStorage.setItem("cashedFilms", JSON.stringify(cashedFilms));
        await renderFilmCards(filmsList);
      }
    } else if (filmsList.Response === "False") {
      renderModalResultEmpty();
    } else {
      renderModalResultError();
    }
  } else {
    renderFilmCards(cashedFilms);
  }
  spinner.classList.add("hidden");
}

searchBtn.addEventListener("click", async () => {
  commonServerError = false;
  mainContainer.innerHTML = "";
  await findAndRenderFilms(searchInput.value, false);
});

favoritesBtn.addEventListener("click", () => {
  rendeFavoritesFilmCards(favorites);
});

// -----Filter
const filterFieldSet = document.querySelector("#filterFieldSet");
const yearFromFilter = document.querySelector("#yearFromFilter");
const yearToFilter = document.querySelector("#yearToFilter");
const spanFilterBtn = document.querySelector("#spanFilterBtn");

ratingFilter.addEventListener("input", (event) => {
  ratingFilterValue = event.target.value;
  document.querySelector("#ratingFilterValue").textContent = ratingFilterValue;
});

filterRun.addEventListener("click", async () => {
  genreFilters = [...filterFieldSet.querySelectorAll("input:checked")].map(
    (e) => e.value
  );
  spanFilterBtn.textContent = "Filters enabled";
  globalFilterKey = true;
  clearMainContainer();
  toggleMenu(false);
  await renderFilmCards(filmsList);
});

filterReset.addEventListener("click", async () => {
  genreFilters = [];
  globalFilterKey = false;
  clearMainContainer();
  filterFieldSet
    .querySelectorAll("input:checked")
    .forEach((el) => (el.checked = false));
  ratingFilterValue = 5;
  document.querySelector("#ratingFilterValue").textContent = ratingFilterValue;
  await renderFilmCards(filmsList);
  spanFilterBtn.textContent = "Filter";
  yearFromFilter.value = 1900;
  yearToFilter.value = 2020;
});

function filterFilm(element, listGenres, yearFrom, yearTo, raiting) {
  let hasMatch = false;
  let hasMatchGenre = false;
  let hasMatchYear = false;
  let hasMatchRating = false;
  if (globalFilterKey === true) {
    if (listGenres.length === 0) {
      hasMatchGenre = true;
    } else {
      hasMatchGenre = listGenres.some((genre) =>
        element.fullInfo.Genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    //фильтрация по году выхода

    if (element.Year >= yearFrom && element.Year <= yearTo) {
      hasMatchYear = true;
    } else {
      hasMatchYear = false;
    }
    // фильтрация по рейтингу
    if (element.fullInfo.Ratings.length === 0) {
      hasMatchRating = false;
    } else {
      if (element.fullInfo.Ratings[0].Value[0] >= raiting) {
        hasMatchRating = true;
      } else {
        hasMatchRating = false;
      }
    }

    if (hasMatchGenre && hasMatchYear && hasMatchRating) {
      // main key
      hasMatch = true;
    } else {
      hasMatch = false;
    }
  } else {
    hasMatch = true;
  }

  return hasMatch;
}

function clearMainContainer() {
  mainContainer.innerHTML = "";
}

async function renderFilmCards(arr) {
  if (arr.Search !== undefined) {
    arr.Search.forEach((element) => {
      const elementMatched = filterFilm(
        element,
        genreFilters,
        yearFromFilter.value,
        yearToFilter.value,
        ratingFilterValue
      );
      if (elementMatched === true) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        //------------Image-----------------//
        const posterImg = document.createElement("img");
        posterImg.src = element.Poster;
        cardDiv.appendChild(posterImg);
        //------------Title-----------------//
        const posterTitle = document.createElement("h2");
        posterTitle.classList.add("card-title");
        posterTitle.textContent = element.Title;
        cardDiv.appendChild(posterTitle);
        //--------------Year--------------------//
        const posterYear = document.createElement("p");
        posterYear.classList.add("card-year");
        posterYear.textContent = element.Year;
        cardDiv.appendChild(posterYear);
        //--------------Genre--------------------//
        const posterGenre = document.createElement("p");
        posterGenre.textContent = element.fullInfo.Genre;
        cardDiv.appendChild(posterGenre);

        //------------Ratings------------------//
        const rating = document.createElement("p");
        rating.textContent =
          element.fullInfo.Ratings.length > 0
            ? element.fullInfo.Ratings[0].Value
            : "not data";
        cardDiv.appendChild(rating);

        // ------------Plot--------------//
        const plot = document.createElement("p");
        plot.textContent = element.fullInfo.Plot.slice(0, 99) + "...";
        cardDiv.appendChild(plot);

        //-------------detailsBtn------//
        const detailsBtn = document.createElement("button");
        detailsBtn.textContent = "Подробнее";
        detailsBtn.classList.add("btn", "card-btn");

        detailsBtn.addEventListener("click", () => {
          renderModalDetailsCardFilm(element);
        });
        cardDiv.appendChild(detailsBtn);

        //-----------addToFavoritesBtn------//
        const addToFavoritesBtn = document.createElement("button");
        addToFavoritesBtn.textContent = "Добавить в избранное";
        addToFavoritesBtn.classList.add("btn", "card-btn");
        const favoriteIcon = document.createElement("i");
        favoriteIcon.classList.add("bi", "bi-heart-fill", "card-btn-icon");

        addToFavoritesBtn.appendChild(favoriteIcon);
        addToFavoritesBtn.addEventListener("click", () => {
          favorites.push(element);
          updateStorage();
          updateCounter(favorites.length);
        });

        cardDiv.appendChild(addToFavoritesBtn);

        mainContainer.appendChild(cardDiv);
      }
    });
  }
}

// NAVIGATOR
const menuBtn = document.querySelector("#menuBtn");
const sideMenu = document.querySelector("#sideMenu");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");
const filterBtn = document.querySelector("#filterBtn");

const toggleMenu = (isOpen) => {
  sideMenu.classList.toggle("active", isOpen);
  overlay.classList.toggle("active", isOpen);
  menuBtn.classList.toggle("hidden", isOpen);
};

menuBtn?.addEventListener("click", () => toggleMenu(true));
filterBtn?.addEventListener("click", () => toggleMenu(true));
closeBtn?.addEventListener("click", () => toggleMenu(false));
overlay?.addEventListener("click", () => toggleMenu(false));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {
  const mainLink = item.querySelector(".main-link");

  // mainLink.addEventListener("click", (e) => {
  //   e.preventDefault(); // отменяем переход по ссылке

  //   // Закрываем все остальные пункты
  //   // document.querySelectorAll(".sub-links").forEach((el) => {
  //   //   if (el !== item) el.classList.add("close");
  //   // });

  //   // Переключаем видимость подпунктов текущего
  //   item.querySelector(".sub-links").classList.toggle("close");
  // });
});

// Favorites

// Функция обновления localStorage
function updateStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
// Функция обновления отображения счетчика
function updateCounter(counter = 0) {
  document.querySelector("#favoriteCounter").textContent = counter;
}

function rendeFavoritesFilmCards(arr) {
  mainContainer.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((element) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      //------------Image-----------------//
      const posterImg = document.createElement("img");
      posterImg.src = element.Poster;
      cardDiv.appendChild(posterImg);
      //------------Title-----------------//
      const posterTitle = document.createElement("h2");
      posterTitle.classList.add("card-title");
      posterTitle.textContent = element.Title;
      cardDiv.appendChild(posterTitle);
      //--------------Year--------------------//
      const posterYear = document.createElement("p");
      posterYear.classList.add("card-year");
      posterYear.textContent = element.Year;
      cardDiv.appendChild(posterYear);
      //--------------Genre--------------------//
      const posterGenre = document.createElement("p");
      posterGenre.textContent = element.fullInfo.Genre;
      cardDiv.appendChild(posterGenre);

      //------------Ratings------------------//
      const rating = document.createElement("p");
      rating.textContent = element.fullInfo.Ratings[0].Value;
      cardDiv.appendChild(rating);

      // ------------Plot--------------//
      const plot = document.createElement("p");
      plot.textContent = element.fullInfo.Plot.slice(0, 99) + "...";
      cardDiv.appendChild(plot);

      //-------------detailsBtn------//
      const detailsBtn = document.createElement("button");
      detailsBtn.textContent = "Подробнее";
      cardDiv.appendChild(detailsBtn);

      //-----------addToFavoritesBtn------//
      const addToFavoritesBtn = document.createElement("button");
      addToFavoritesBtn.textContent = "Удалить";
      addToFavoritesBtn.addEventListener("click", () => {
        favorites = favorites.filter((item) => {
          return item.imdbID !== element.imdbID;
        });
        updateStorage();
        updateCounter(favorites.length);
        rendeFavoritesFilmCards(favorites);
      });

      cardDiv.appendChild(addToFavoritesBtn);

      mainContainer.appendChild(cardDiv);
    });
  } else {
    mainContainer.innerHTML = "Вы еще не добавили ни одного фильма в избранное";
  }
}

// Modal
const modal = document.querySelector(".modal");
// const modalBody = document.querySelector(".modalBody");
// const closeModalBtn = document.querySelector(".closeModalBtn");
const modalDetailsCardFilm = document.querySelector("#modalDetailsCardFilm");

// modalBody.addEventListener("click", (e) => e.stopPropagation());
// closeModalBtn.addEventListener("click", toggleModalWindow);
const toggleModalWindow = () => {
  //modal.classList.toggle("modalHidden");
  document.querySelector("#modalDetailsCardFilm").innerHTML = "";
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("modalHidden")) {
    toggleModalWindow();
  }
});

function renderModalDetailsCardFilm(filmElement) {
  console.log(filmElement);
  modalDetailsCardFilm.innerHTML = `

        <div class="modal">
            <div class="modalBody">
              <button class="closeModalBtn" aria-label="Close modal" >
                <i class="bi bi-x-lg"></i>
              </button>
              <img src="${filmElement.Poster}" alt="Poster" />
              <h2>${filmElement.Title}</h2>
              <span>${filmElement.fullInfo.Director}</span>
              <span>${filmElement.fullInfo.Actors}</span>
              <p>${filmElement.fullInfo.Plot}</p>
              <p>${filmElement.fullInfo.Runtime}</p>
              <p>${filmElement.fullInfo.Ratings[0].Value}</p>
              <button><a target="_blank" href="https://www.youtube.com/results?search_query=${filmElement.Title}">Трейлер</a></button>
              <button onclick="removeModalDetailsCardFilm()">Назад к списку</button>
            </div>
        </div>

  `;
  const closeModalBtn = document.querySelector(".closeModalBtn");
  closeModalBtn.addEventListener("click", () => {
    removeModalDetailsCardFilm();
  });
}

function removeModalDetailsCardFilm() {
  modalDetailsCardFilm.innerHTML = "";
}
