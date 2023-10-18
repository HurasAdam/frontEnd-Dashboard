import projectApi from "../axios/axios"



export const createProject= (data)=>{
  return new Promise((resolve,reject)=>{
    const rersponse = projectApi.post("projects",{
      body:JSON.stringify({
        data
      })
    })
    .then((res)=>resolve(res.data))
    .catch((error)=>reject(error))
  })
}


export const getProjectList = (page) => {
  return new Promise((resolve, reject) => {

    const response = projectApi
      .get(`projects?page=${page}`)
      .then((res) => resolve(res.data));
  });
};

export const getProject = (projectId) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(`projects/${projectId}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const updateProject = (id, data) => {
  return new Promise((resolve, reject) => {
   
    const response = projectApi.patch(`projects/${id}`, 
    { body: JSON.stringify({
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


