import { eventsStore } from "./mock_data.js";

const eventsContainer = document.querySelector("#events_container");
const mediaQuery = window.matchMedia("(max-width: 480px)");
let mobileView = false;

function renderCards(mobileView) {
  eventsContainer.innerHTML = "";
  eventsStore.forEach((element) => {
    const divCard = document.createElement("div");
    if (mobileView === false) {
      divCard.classList.add("card");
      divCard.innerHTML = `
          <img class="card-img" src=${element.image} />
            <h3>${element.title}</h3>
            <p>${element.category}</p>
            <div class="card-date">
              <img src="assets/icons/events/date.svg" alt="" aria-hidden="true" />
              <time datetime="${element.date.toISOString()}"
                >${element.date.toLocaleString()}</time
              >
            </div>
            <div class="card-event">
              <div class="card-event_block">
                <img src="assets/icons/events/check.svg" alt="" />
                <span> ${element.distance} going</span>
              </div>
              <div class="card-event_block">
                <img src="assets/icons/events/date.svg" alt="" />
                <span> Free</span>
              </div>
            </div>
    `;
    } else {
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
                <span class="event-card_attendees">${element.attendees}</span>
                <span class="event-card_places">${element.distance} going</span>
              </div>
            </div>
      `;
    }
    eventsContainer.appendChild(divCard);
  });
}

function handleMediaChange(e) {
  if (e.matches) {
    console.log("≤ 480px — mobile view");
    mobileView = true;
    renderCards(mobileView);
    // mobile logic
  } else {
    console.log("> 480px — desktop view");
    mobileView = false;
    renderCards(mobileView);
    // desktop logic
  }
}

window.addEventListener("load", () => {
  renderCards(mobileView);
});

// первый запуск
handleMediaChange(mediaQuery);

// слушаем изменения
mediaQuery.addEventListener("change", handleMediaChange);
