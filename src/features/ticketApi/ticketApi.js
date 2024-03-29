import projectApi from "../axios/axios";



export const createTicket =async(ticketData)=>{
const response = await projectApi.post("notes",ticketData)
return response.data
}

export const getTicketList = async () => {
  const response = await projectApi.get("notes");
  return response.data;
};

export const getTicket = async (id) => {
  const response = await projectApi.get(`notes/${id}`);
  return response.data;
};


export const deleteTicket = async (id)=>{
const response = await projectApi.delete(`notes/${id}`);
return response.data;
}


export const updateTicket= async ({id,content})=>{
  console.log(id)
  console.log(content)
  const response = await projectApi.patch(`notes/${id}`,content)
  return response.data
}

export const getTicketPosts= async(id)=>{

  const response= await projectApi.get(`posts?ticketId=${id}`)
  return response.data;
}

export const createTicketPost= async (formData)=>{

  console.log(formData)
  const response = await projectApi.post(`posts?ticketId=${formData.id}`,formData.content)
  return response.data
}

export const editTicketPost = async ({id,content})=>{
  const response = await projectApi.patch(`posts/${id}`,{content})
  return response.data
}

export const deleteTicketPost = async(id)=>{

  const response = await projectApi.delete(`posts/${id}`)
  return response.data
}

export const getSelectOptionList = async(option)=>{
  const response = await projectApi.get(`/options?option=${option}`)
  return response.data
}

export const getArchiveTicketList= async()=>{
const reponse = await projectApi.get('/notes/archived')
return reponse.data
}


export const downloadFile= async(id)=>{

  const response = await projectApi.get(`/download?public_Id=${id}`)
  return response.data;
}

export const deleteFile=async(id)=>{
  const response = await projectApi.delete(`/download/${id}`)
  return response.data
}