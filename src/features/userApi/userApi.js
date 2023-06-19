import axios from "axios";

const userApi = axios.create({
    baseURL: "http://127.0.0.1:3000/api/",
  });


  export const getAllUsers=(pmEmail,id)=>{

    new Promise((resolve,reject)=>{
        const response = userApi.get(`user?PM=${pmEmail}&&project=${id}`)
        .then((res)=>resolve(res))
        .catch((error)=>reject(error))
    })
  }


  export const getProjectAsignedUsers=(id)=>{
    new Promise ((resolve,reject)=>{
        const response = userApi.get(`user?=${id}`)
        .then((res)=>resolve(res))
        .catch((error)=>reject(error))
    })
  }