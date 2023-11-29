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


export const uploadAvatar= async(file)=>{

  const response = await projectApi.patch('/user/upload',file)
  return response.data
}

export const removeAvatar= async()=>{

  const reponse = await projectApi.delete('/user/remove-avatar')
  return reponse.data
}

export const updateUser= async(data)=>{

  const response = await projectApi.patch('/user',data)
  return response.data
}


export const updateEmail= async(data)=>{

const response = await projectApi.patch('/user/update-email',data)
return response.data

}

export const updatePassword= async(data)=>{

  const response = await projectApi.patch('/user/update-password',data)
  return response.data
}