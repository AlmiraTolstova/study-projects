import { eventsStore } from "./mock_data.js";
import { filters } from "./mock_data.js";

const map = L.map("map").setView([40.727732, -73.899867], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);
L.marker([40.727732, -73.899867])
  .addTo(map)
  .bindPopup("We are here")
  .openPopup();

const selectDate = document.querySelector("#select-date");
const selectType = document.querySelector("#select-type");
const selectDistance = document.querySelector("#select-distance");
const selectCategory = document.querySelector("#select-category");
const eventsContainer = document.querySelector("#events_container");

let dateFilterValue = "Any date";
let typeFilterValue = "Any type";
let distanceFilterValue = "Any distance";
let categoryFilterValue = "Any category";

function filterEvents(
  eventsStore,
  dateFilterValue,
  typeFilterValue,
  distanceFilterValue,
  categoryFilterValue
) {
  let resultEventsStore = [];
  if (dateFilterValue === "Any date") {
    resultEventsStore = eventsStore;
  } else {
    resultEventsStore = eventsStore.filter((item) => {
      return item.date.toLocaleString() == dateFilterValue;
    });
  }
  if (typeFilterValue !== "Any type") {
    resultEventsStore = resultEventsStore.filter((item) => {
      return item.type == typeFilterValue;
    });
  }
  if (distanceFilterValue !== "Any distance") {
    resultEventsStore = resultEventsStore.filter((item) => {
      return item.distance <= distanceFilterValue;
    });
  }
  if (categoryFilterValue !== "Any category") {
    resultEventsStore = resultEventsStore.filter((item) => {
      return item.category == categoryFilterValue;
    });
  }
  console.log(resultEventsStore);
  renderCards(resultEventsStore, eventsContainer);
}

function renderCards(eventsStore, eventsContainer) {
  eventsContainer.innerHTML = "";
  eventsStore.forEach((element) => {
    const divCard = document.createElement("div");
    divCard.classList.add("event-card");
    divCard.innerHTML = `         
            <img
              class="event-card_img"
              src=${element.image} 
              alt=""
            />
            <div class="event-card_info">
              <div class="event-card_date">
                <time class="event-card_date" datetime="${element.date.toISOString()}"
                >${element.date.toLocaleString()}</time</div>
              <h3 class="event-card_h3">${element.title}</h3>
              <p class="event-card_p">${element.category}</p>
              <div>
                <span class="event-card_attendees">${
                  element.attendees
                } attendees</span>
                <span class="event-card_places">${element.distance} going</span>
              </div>
            </div>
      `;
    eventsContainer.appendChild(divCard);
  });
}

window.addEventListener("load", () => {
  // DropDown with dates
  filters[0].options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.innerText =
      element === "Any date" ? "Any date" : element.toLocaleString();
    selectDate.appendChild(newOption);
  });

  filters[1].options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.innerText = element;
    selectType.appendChild(newOption);
  });

  filters[2].options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.innerText = element;
    selectDistance.appendChild(newOption);
  });
  filters[3].options.forEach((element) => {
    const newOption = document.createElement("option");
    newOption.innerText = element;
    selectCategory.appendChild(newOption);
  });

  //rendering cards
  renderCards(eventsStore, eventsContainer);
});

selectDate.addEventListener("change", (event) => {
  dateFilterValue = event.target.value;
  filterEvents(
    eventsStore,
    dateFilterValue,
    typeFilterValue,
    distanceFilterValue,
    categoryFilterValue
  );
});

selectType.addEventListener("change", (event) => {
  typeFilterValue = event.target.value;
  filterEvents(
    eventsStore,
    dateFilterValue,
    typeFilterValue,
    distanceFilterValue,
    categoryFilterValue
  );
});
selectDistance.addEventListener("change", (event) => {
  distanceFilterValue = event.target.value;
  filterEvents(
    eventsStore,
    dateFilterValue,
    typeFilterValue,
    distanceFilterValue,
    categoryFilterValue
  );
});
selectCategory.addEventListener("change", (event) => {
  categoryFilterValue = event.target.value;
  filterEvents(
    eventsStore,
    dateFilterValue,
    typeFilterValue,
    distanceFilterValue,
    categoryFilterValue
  );
});
