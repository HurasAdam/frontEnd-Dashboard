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
