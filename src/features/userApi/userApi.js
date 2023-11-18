import projectApi from "../axios/axios";

export const getProjectContributorList = async(id) => {
  
    const response = await projectApi
      .get(`user?project=${id}&contributor=false`)
  return response.data

};

export const getUsers = async() => {
 
    const response = await projectApi
      .get("user")
return response.data
};

export const getUserProfile= async()=>{
const response = await projectApi.get('/user/user-profile')
return response.data
}

export const getAdminUsers= async()=>{


  const  response = await projectApi
  .get("user?role=admin")
return response.data
}