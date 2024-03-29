import projectApi from "../axios/axios";
import { handleCurrentMonth } from "../../utils/handleCurrentMonth";

export const createProject = (projectData) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .post("projects", projectData)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const getProjectList = (page, selectedSize) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(`projects?page=${page}&pageSize=${selectedSize}`)
      .then((res) => resolve(res.data));
  });
};

export const getProjectListByMembership = async () => {
  const response = await projectApi.get("projects?membership=true");
  return response.data;
};

export const getProject = ({ projectId, query }) => {
  let url = `projects/${projectId}`;

  if (query) {
    url = url + `?${query}`;
  }
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(url)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const updateProject = ({ id, update }) => {
  return new Promise((resolve, reject) => {
    console.log(`ID:${id}`);
    console.log(update);
    const response = projectApi
      .patch(`projects/${id}`, update)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const getProjectActivity = async (projectId, query) => {




  const {currentMonthName } = handleCurrentMonth();
  const url = query ? `chartData/${projectId}?${query}` : `chartData/${projectId}`;

  const response = await projectApi.get(url);
  return response.data;
};
export const deleteProject = async (id) => {
  const response = await projectApi.delete(`projects/${id}`);
  return response.data;
};
