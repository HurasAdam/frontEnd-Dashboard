
import axios  from 'axios';

const projectApi = axios.create({
    baseURL:"http://127.0.0.1:3000/api/"
})

export const getProjectList=(token,query)=>{
    return new Promise((resolve,reject)=>{
        // console.log(token)
        const response  = projectApi.get(`projects${query}`,{
        headers:{'Authorization': `Bearer ${token}`},}
        ).then((res)=>resolve(res.data))
    })
}

export const getProject=(token,query)=>{
return new Promise((resolve,reject)=>{
    const respinse = projectApi.get(`projects/${query}`,{
        headers:{'Authorization':`Bearer ${token}`}
    }).then((res)=>resolve(res.data))
    .catch((error)=>reject(error))
})
}


export const deleteProject=(token,id)=>{
    return new Promise((resolve,reject)=>{
        console.log(id)
        const response = projectApi.delete(`projects/${id}`,{
            headers:{'Authorization':`Bearer ${token}`}
        }).then((res)=>
        resolve(res.data))
        .catch((error)=>reject(error))
    })
 
}

export default projectApi;