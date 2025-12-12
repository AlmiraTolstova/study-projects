// const BASE_URL = "https://jsonplaceholder.typicode.com";
// let postId = 1;
// async function getPost(id) {
//   try {
//     const response = await fetch(`${BASE_URL}/posts/${id}`);
//     if (!response.ok) {
//       throw new Error("Faild to fetch post");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// 1. validation for switchers < >
// 2. localStorage
// 3. loading
// 4**. dynamic search {title, body}

const BASE_URL = "https://jsonplaceholder.typicode.com";

let postId = localStorage.getItem("postId")
  ? Number(localStorage.getItem("postId"))
  : 1;

let posts = [];

//-------------Loader-----------------
function showLoader() {
  document.querySelector("#loader-overlay").style.display = "flex";
}

function hideLoader() {
  document.querySelector("#loader-overlay").style.display = "none";
}

async function getPost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//---------------API------------------
async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//-----------update Buttons------------------
function updateButtons() {
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");

  prevBtn.disabled = postId <= 1;

  document.querySelector("#post-number").textContent = postId;

  nextBtn.disabled = postId >= 100;
}

//-------------Render post---------------------
function renderPost(post) {
  document.querySelector("#post").innerHTML = `
        <div class="post-header">
          <i class="bi bi-person-circle"></i>
          <h2 id="title">${post.title}</h2>
        </div>
        <div class="post-user">
          <p id="body">${post.body}</p>
        </div>
    `;
}

//--------------Load post-------------------
async function loadPost(id) {
  showLoader();

  const post = await getPost(id);
  if (post) {
    localStorage.setItem("postId", post["id"]);
  }
  if (post) renderPost(post);

  setTimeout(() => {
    hideLoader();
  }, 300);
  updateButtons();
}

//---------Load all posts for search--------
async function loadPosts() {
  posts = await getAllPosts();
  console.log(posts);
}

// ------------Swirchers---------------
document.getElementById("nextBtn").addEventListener("click", () => {
  if (postId < 100) {
    postId++;
    loadPost(postId);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (postId > 1) {
    postId--;
    loadPost(postId);
  }
});

//-------------Search--------------
document.querySelector("#searchInput").addEventListener("input", () => {
  const query = document.querySelector("#searchInput").value.toLowerCase();

  if (!query.trim()) {
    document.querySelector("#searchResults").innerHTML = "";
    return;
  }

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
  );

  renderSearchResults(filtered);
});

//------------RenderSearchResult---------
function renderSearchResults(filtered) {
  if (filtered) {
    document.querySelector("#searchResults").innerHTML = "";
    filtered.forEach((post) => {
      document.querySelector("#searchResults").innerHTML += `
      <div class="post" >
        <div class="post-header">
          <i class="bi bi-person-circle"></i>
          <h2 id="title">${post.title}</h2>
        </div>
        <div class="post-user">
          <p id="body">${post.body}</p>
        </div>
         </div>
    `;
    });
  }
}

//-------renderSearchResults---------------
function renderSearchResults(filtered) {
  const results = document.querySelector("#searchResults");
  results.innerHTML = "";

  filtered.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("search-item");
    div.innerHTML = `
        <strong>${post.title}</strong>
        <p>${post.body}</p>
    `;

    div.addEventListener("click", () => {
      postId = post.id;
      loadPost(postId);
      results.innerHTML = "";
      document.querySelector("#searchInput").value = "";
    });

    results.appendChild(div);
  });
}

//----------Initialize--------------
loadPost(postId);

loadPosts();

updateButtons();
