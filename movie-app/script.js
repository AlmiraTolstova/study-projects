const BASE_URL = "http://www.omdbapi.com/";

const API_KEY = "apikey=4bd1180e";

async function searchFilms(searchInput) {
  try {
    const response = await fetch(`${BASE_URL}?s=${searchInput}&${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getFullInfoAboutFilmById(id) {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const mainContainer = document.querySelector(".main-container");

let filmsList = [];
searchBtn.addEventListener("click", async () => {
  filmsList = await searchFilms(searchInput.value);
  for (const element of filmsList.Search) {
    element.fullInfo = await getFullInfoAboutFilmById(element.imdbID);
  }
  await renderFilmCards(filmsList);
});

async function renderFilmCards(arr) {
  if (arr) {
    mainContainer.innerHTML = "";
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

      mainContainer.appendChild(cardDiv);
    });
  }
}
