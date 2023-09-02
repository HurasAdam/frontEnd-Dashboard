import axios from "axios";

const projectApi = axios.create({
  baseURL: "http://127.0.0.1:3000/api/",
});

export const getProjectList = (token, page) => {
  return new Promise((resolve, reject) => {
    // console.log(token)
    const response = projectApi
      .get(`projects?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => resolve(res.data));
  });
};

export const getProject = (token, projectId) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(`projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const updateProject = (token, id, data) => {
  return new Promise((resolve, reject) => {
   
    const response = projectApi.patch(`projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        data,
      }),
    }).then((res)=>resolve(res.data))
    .catch((error)=>reject(error));
  });
};

export const deleteProject = (token, id) => {
  return new Promise((resolve, reject) => {

    const response = projectApi
      .delete(`projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export default projectApi;
