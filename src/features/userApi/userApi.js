import axios from "axios";

const userApi = axios.create({
    baseURL: "http://127.0.0.1:3000/api/",
  });


  export const getUserList=(token,pmEmail,id)=>{


    new Promise((resolve,reject)=>{
        const response = userApi.get(`user?=${pmEmail}`,{
            headers:{"Authorization": `Bearer ${token}`}
        })
        .then((res)=>resolve(res))
        .catch((error)=>reject(error))
    })
  }


  export const getProjectContributorList=(token,id)=>{
   return new Promise ((resolve,reject)=>{
        const response = userApi.get(`user?=${id}`,{
          headers:{"Authorization":`Bearer ${token}`}
        })
        .then((res)=>resolve(res.data))
        
        .catch((error)=>reject(error))
      
    })
  }

  export default userApi;