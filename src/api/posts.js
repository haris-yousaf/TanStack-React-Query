import axios from "axios"

export function getPosts() {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts", { params: { _sort: "title" } })
    .then(res => res.data)
    .catch(error => {
      console.error("Error fetching posts:", error);
      throw error;
    });
}

export function getPost(id) {

  return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.data)
}

export function createPost({ title, body }) {
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", {
      title,
      body,
      userId: 1,
      id: id < 101 ? id: Date.now(),
    })
    .then(res => res.data)
}