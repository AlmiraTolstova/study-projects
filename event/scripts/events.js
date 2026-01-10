const map = L.map("map").setView([55.751244, 37.618423], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

L.marker([55.751244, 37.618423]).addTo(map).bindPopup("Мы здесь").openPopup();
