const root = document.querySelector("#root");
let sliderIndex = 0;

const images = [
  "https://www.vinterier.ru/pictures/shop/krasivyiy-peiyzag-kartina-maslom-40x30.jpg",
  "https://kartin.papik.pro/uploads/posts/2023-07/thumbs/1688461053_kartin-papik-pro-p-kartinki-priroda-leto-krasivie-v-khoroshem-56.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Altdorfer-Donau.jpg/220px-Altdorfer-Donau.jpg",
  "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400",
];

const frame = document.createElement("div");
const cards = document.createElement("div");
const triggers = document.createElement("div");
const leftBtn = document.createElement("button");
const rightBtn = document.createElement("button");
const rounds = document.createElement("div");

triggers.append(leftBtn, rightBtn);
frame.append(cards, triggers, rounds);
root.append(frame);

frame.classList.add("frame");
cards.classList.add("cards");
triggers.classList.add("triggers");
rounds.classList.add("rounds");

leftBtn.textContent = "<";
rightBtn.textContent = ">";

images.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url("${image}")`;
  cards.append(card);
});

rightBtn.addEventListener("click", () => {
  if (sliderIndex < images.length - 1) {
    sliderIndex++;
    cards.style.left = `${-500 * sliderIndex}px`;
  }
});

leftBtn.addEventListener("click", () => {
  if (sliderIndex !== 0) {
    sliderIndex--;
    cards.style.left = `${-500 * sliderIndex}px`;
  }
});

images.forEach((image, ind) => {
  const button = document.createElement("button");
  rounds.append(button);

  button.addEventListener("click", () => {
    sliderIndex = ind;
    cards.style.left = `${-500 * sliderIndex}px`;

    const allButtons = document.querySelectorAll(".rounds>button");

    allButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});

//////////////////////
const data = [
  {
    id: 1,
    title: "1О компании",
    text: `11001010010101010100101ipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.`,
  },
  {
    id: 2,
    title: "2О компании",
    text: "2L200000000000000000000022002r adipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.",
  },
];

// const images = [
//   "https://artworld.ru/images/cms/content/catalog2/kartina_v_interier_pejzazh_maslom_v_lesnoj_tishi_ki200106.jpg",
//   "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Altdorfer-Donau.jpg/220px-Altdorfer-Donau.jpg",
//   "https://artworld.ru/images/cms/content/catalog2/kartina_v_interier_pejzazh_maslom_rannej_vesnoj_v_lesu_ki200102.jpg",
// ];
