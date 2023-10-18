import projectApi from "../axios/axios";

export const getProjectContributorList = (id) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(`user?=${id}`)
      .then((res) => resolve(res.data))

      .catch((error) => reject(error));
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get("user")
      .then((res) => resolve(res.data))

      .catch((error) => reject(error));
  });
};
