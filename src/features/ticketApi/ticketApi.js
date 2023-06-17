import axios  from 'axios';

const ticketApi = axios.create({
    baseURL:"http://127.0.0.1:3000/api/"
})

export const getTicketList= (token,query)=>{

    new Promise((resolve,reject)=>{
        const response = ticketApi.get(`notes${query}`,{
            headers:{'Authorization':`Bearer ${token}`}
        }).then((res)=>resolve(res.data))
    })
}