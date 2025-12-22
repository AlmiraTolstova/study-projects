const BASE_URL = "http://www.omdbapi.com/";

const API_KEY = "apikey=4bd1180e";

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
    const response = await fetch(`${BASE_URL}?i=${id}&${API_KEY}`);
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
let commonServerError = false;
let filmsList = [];
searchBtn.addEventListener("click", async () => {
  commonServerError = false;
  mainContainer.innerHTML = "";
  spinner.classList.remove("hidden");
  filmsList = await searchFilms(searchInput.value);
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
      await renderFilmCards(filmsList);
    }
  } else if (filmsList.Response === "False") {
    renderModalResultEmpty();
  } else {
    renderModalResultError();
  }
  spinner.classList.add("hidden");
});

async function renderFilmCards(arr) {
  if (arr) {
    arr.Search.forEach((element) => {
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
      addToFavoritesBtn.textContent = "Добавить в избранное";
      cardDiv.appendChild(addToFavoritesBtn);

      mainContainer.appendChild(cardDiv);
    });
  }
}

// NAVIGATOR
const menuBtn = document.querySelector("#menuBtn");
const sideMenu = document.querySelector("#sideMenu");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");

const toggleMenu = (isOpen) => {
  sideMenu.classList.toggle("active", isOpen);
  overlay.classList.toggle("active", isOpen);
  menuBtn.classList.toggle("hidden", isOpen);
};

menuBtn?.addEventListener("click", () => toggleMenu(true));
closeBtn?.addEventListener("click", () => toggleMenu(false));
overlay?.addEventListener("click", () => toggleMenu(false));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {
  const mainLink = item.querySelector(".main-link");

  mainLink.addEventListener("click", (e) => {
    e.preventDefault(); // отменяем переход по ссылке

    // Закрываем все остальные пункты
    // document.querySelectorAll(".sub-links").forEach((el) => {
    //   if (el !== item) el.classList.add("close");
    // });

    // Переключаем видимость подпунктов текущего
    item.querySelector(".sub-links").classList.toggle("close");
  });
});
