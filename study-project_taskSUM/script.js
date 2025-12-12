const URL_BASE = "https://jsonplaceholder.typicode.com";
const URL_POSTS = `${URL_BASE}/posts`;
const URL_USERS = `${URL_BASE}/users`;
const URL_COMMENTS = `${URL_BASE}/comments`;

let listPosts = [];
let listUsers = [];
let listComments = [];
let selectedUserIdForFilter = "all";

let ListPostsWithComments = [];

async function getPosts() {
  try {
    const response = await fetch(URL_POSTS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUsers() {
  try {
    const response = await fetch(URL_USERS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCommets() {
  try {
    const response = await fetch(URL_COMMENTS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function mergeData(posts, users, comments) {
  let resultArray = [];
  posts.forEach((post) => {
    const currentUser = users.filter((item) => {
      return item.id === post.userId;
    });

    const currentComments = comments.filter((item) => {
      return item.postId === post.id;
    });

    resultArray.push({
      postTitle: post.title,
      userName: currentUser[0].name,
      userId: currentUser[0].id,
      postBody: post.body,
      commentsCount: currentComments.length,
      postComments: currentComments,
    });
  });
  return resultArray;
}

const listOfTasks = document.querySelector(".tasks-list");

function renderPosts(arr, container, selectedUserFilter) {
  container.innerHTML = "";
  const flteredArr = useCombainFilter(arr, selectedUserFilter);

  flteredArr.forEach((element) => {
    const postCardDiv = document.createElement("div");
    postCardDiv.innerHTML = `
        <h3>${element.postTitle}</h3>
          <p class="name">${element.userName}</p>
          <p class="post-body">${element.postBody.slice(0, 100)}...</p>
          <p>Количество комментариев к этому посту: ${element.commentsCount}</p>
          <button>Читать далее</button>
    `;
    container.appendChild(postCardDiv);
  });
}

function useCombainFilter(mergedData, selectedUserFilter) {
  let filteredArr = [];

  if (selectedUserFilter !== "all") {
    if (selectedUserFilter !== "") {
      filteredArr = mergedData.filter((elem) => {
        return elem.userId === Number(selectedUserFilter);
      });
      return filteredArr;
    }
  } else return mergedData;
}

const userFilter = document.querySelector("#userFilter");
// Фильтр по пользователю
function makeUsersfilter(users, selectusers) {
  users.forEach((item) => {
    const opt1 = document.createElement("option");

    opt1.value = item.id;
    opt1.text = item.name;
    selectusers.add(opt1);
  });
}

userFilter.addEventListener("change", (event) => {
  selectedUserIdForFilter = event.target.value;
  renderPosts(ListPostsWithComments, listOfTasks, selectedUserIdForFilter);
});

window.addEventListener("load", async () => {
  listPosts = await getPosts();
  listUsers = await getUsers();
  listComments = await getCommets();
  makeUsersfilter(listUsers, userFilter);
  ListPostsWithComments = mergeData(listPosts, listUsers, listComments);
  renderPosts(ListPostsWithComments, listOfTasks, selectedUserIdForFilter);
});
