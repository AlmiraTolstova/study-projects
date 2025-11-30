const URL_BASE = "https://jsonplaceholder.typicode.com";
const URL_POSTS = `${URL_BASE}/posts`;
const URL_USERS = `${URL_BASE}/users`;
const URL_COMMENTS = `${URL_BASE}/comments`;

let listPosts = [];
let listUsers = [];
let listComments = [];

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
      postBody: post.body,
      commentsCount: currentComments.length,
      postComments: currentComments,
    });
  });
  return resultArray;
}

const listOfTasks = document.querySelector(".tasks-list");

function renderPosts(arr, container) {
  arr.forEach((element) => {
    const postCardDiv = document.createElement("div");
    postCardDiv.innerHTML = `
        <h3>${element.postTitle}</h3>
          <p class="name">${element.userName}</p>
          <p class="post-body">${element.postBody.slice(0, 100)}...</p>
          <p>Количество комментариев к этому посту: ${element.commentsCount}</p>
          <button>Читать далее</button>
    `;
    console.log(element);
    container.appendChild(postCardDiv);
  });
}

window.addEventListener("load", async () => {
  listPosts = await getPosts();
  listUsers = await getUsers();
  listComments = await getCommets();
  ListPostsWithComments = mergeData(listPosts, listUsers, listComments);
  renderPosts(ListPostsWithComments, listOfTasks);
});
