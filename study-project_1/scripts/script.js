const cookieBanner = document.querySelector(".banner-cookie");
const cookiesSettingsBtn = document.querySelector("#cookiesSettingsBtn");
const cookiesRejectAllBtn = document.querySelector("#cookiesRejectAllBtn");
const cookiesAcceptBtn = document.querySelector("#cookiesAcceptBtn");

const overlay = document.getElementById("cookieOverlay");
// показать баннер при загрузке
window.addEventListener("load", () => {
  overlay.style.display = "flex";
  document.body.classList.add("noscroll");
});

// скрыть баннер и вернуть скролл
function hideBanner() {
  overlay.style.display = "none";
  document.body.classList.remove("noscroll");
}

function addClass(objectName, className) {
  objectName.classList.add(className);
}

cookiesRejectAllBtn.addEventListener("click", () => {
  addClass(cookieBanner, "banner-cookie-closed");
  hideBanner();
});

cookiesAcceptBtn.addEventListener("click", () => {
  addClass(cookieBanner, "banner-cookie-closed");
  hideBanner();
});

cookiesSettingsBtn.addEventListener("click", () => {
  addClass(cookieBanner, "banner-cookie-closed");
  hideBanner();
});
