import projectApi from "../axios/axios"



export const createProject= (projectData)=>{

  return new Promise((resolve,reject)=>{
    const response = projectApi.post("projects",projectData)
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


export const getProjectListByMembership=async()=>{
  const response = await projectApi.get("projects?membership=true")
  return response.data
}


export const getProject = (projectId) => {
  return new Promise((resolve, reject) => {
    const response = projectApi
      .get(`projects/${projectId}`)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const updateProject = ({id,update}) => {
  return new Promise((resolve, reject) => {
console.log(`ID:${id}`)
console.log(update)
    const response = projectApi.patch(`projects/${id}`,update)
   .then((res)=>resolve(res.data))
    .catch((error)=>reject(error));
  });
};

export const deleteProject = async(id) => {

  const response = await projectApi.delete(`projects/${id}`)
  return response.data
};


