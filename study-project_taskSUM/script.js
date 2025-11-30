const URL_BASE = "https://jsonplaceholder.typicode.com";
const URL_POSTS = `${URL_BASE}/posts`;
const URL_USERS = `${URL_BASE}/users`;
const URL_COMMENTS = `${URL_BASE}/comments`;

let listPosts = [];
let listUsers = [];
let listComments = [];

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

window.addEventListener("load", async () => {
  listPosts = await getPosts();
  listUsers = await getUsers();
  listComments = await getCommets();
  console.log(listPosts, listUsers, listComments);
});
