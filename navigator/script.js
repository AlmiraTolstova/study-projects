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
