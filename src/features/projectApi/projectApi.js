
import axios  from 'axios';

const projectApi = axios.create({
    baseURL:"http://127.0.0.1:3000/api/"
})

export const getProjectList=(token)=>{
    return new Promise((resolve,reject)=>{
        console.log(token)
        const response  = projectApi.get(`projects`,{
        headers:{'Authorization': `Bearer ${token}`},}
        ).then((res)=>resolve(res.data))
    })
}

export default projectApi;