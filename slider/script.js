const root = document.querySelector("#root");

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
  {
    id: 3,
    title: "3О компании",
    text: "3L300000000000000000000022002r adipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.",
  },
  {
    id: 4,
    title: "4О компании",
    text: "4L400000000000000000000022002r adipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.",
  },
  {
    id: 5,
    title: "5О компании",
    text: "5L500000000000000000000022002r adipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.",
  },
  {
    id: 6,
    title: "6О компании",
    text: "6L600000000000000000000022002r adipisicing elit. Quas pariatur enim in reprehenderit. Quae, itaque quaerat. Sapiente qui harum velit cum repellat nihil ratione cumque? Aperiam vel provident iusto pariatur.",
  },
];

const frame = document.createElement("div");
frame.classList.add("frame-container");
frame.innerHTML = data[0].text;

data.forEach((element) => {
  const btn = document.createElement("button");
  btn.textContent = element.title;
  btn.classList.add("btn");

  if (element.id === 1) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {
    frame.innerHTML = element.text;
    document
      .querySelectorAll(".btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });

  root.append(btn);
});
root.append(frame);
