const map = L.map("map").setView([55.751244, 37.618423], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

L.marker([55.751244, 37.618423]).addTo(map).bindPopup("Мы здесь").openPopup();

const filters = [
  {
    type: "day",
    options: [
      "Any date",
      new Date(2024, 2, 13, 11),
      new Date(2024, 2, 14, 11),
      new Date(2024, 2, 14, 20),
      new Date(2024, 2, 16, 14),
      new Date(2024, 2, 16, 14),
      new Date(2024, 2, 23, 11, 30),
      new Date(2024, 2, 23, 14),
      new Date(2024, 2, 28, 20),
      new Date(2024, 2, 30, 14),
      new Date(2024, 3, 11, 20),
      new Date(2024, 3, 25, 20),
    ],
  },
  { type: "type", options: ["Any type", "offline", "online"] },
  { type: "distance", options: ["Any distance", 25, 50, 75, 100] },
  {
    type: "category",
    options: [
      "Any category",
      "Health and Wellbeing",
      "Social Activities",
      "Business",
      "Technology",
    ],
  },
];

const selectDate = document.querySelector("#select-date");
const selectType = document.querySelector("#select-type");
const selectDistance = document.querySelector("#select-distance");
const selectCategory = document.querySelector("#select-category");

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

let dateFilterValue = "Any date";
let typeFilterValue = "Any type";
let distanceFilterValue = "Any distance";
let categoryFilterValue = "Any category";

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

const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 74,
  },
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];
const eventsContainer = document.querySelector("#events_container");

// function renderCards(eventsStore, eventsContainer) {
//   eventsContainer.innerHTML = "";
//   eventsStore.forEach((element) => {
//     const divCard = document.createElement("div");
//     divCard.classList.add("card");
//     divCard.innerHTML = `
//           <img class="card-img" src=${element.image} />
//             <h3>${element.title}</h3>
//             <p>${element.category}</p>
//             <div class="card-date">
//               <img src="icons/events/date.svg" alt="" aria-hidden="true" />
//               <time datetime="${element.date.toISOString()}"
//                 >${element.date.toLocaleString()}</time
//               >
//             </div>
//             <div class="card-event">
//               <div class="card-event_block">
//                 <img src="icons/events/check.svg" alt="" />
//                 <span> ${element.distance} going</span>
//               </div>
//               <div class="card-event_block">
//                 <img src="icons/events/date.svg" alt="" />
//                 <span> Free</span>
//               </div>
//                 <div>${element.type}</div>
//             </div>
//     `;
//     eventsContainer.appendChild(divCard);
//   });
// }

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
                <span class="event-card_attendees">${element.attendees}</span>
                <span class="event-card_places">${element.distance} going</span>
              </div>
            </div>
      `;
    eventsContainer.appendChild(divCard);
  });
}
