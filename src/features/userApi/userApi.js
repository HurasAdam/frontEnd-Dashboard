import projectApi from "../axios/axios"


   export const getUserList=(token,pmEmail,id)=>{


    return new Promise((resolve,reject)=>{
        const response = projectApi.get(`user?=${pmEmail}`)
        .then((res)=>resolve(res))
        .catch((error)=>reject(error))
    })
  }


    export const getProjectContributorList=(id)=>{
   return new Promise ((resolve,reject)=>{
  console.log('TEST531')
        const response = projectApi.get(`user?=${id}`)
        .then((res)=>resolve(res.data))
        
        .catch((error)=>reject(error))
      
    })
  }

