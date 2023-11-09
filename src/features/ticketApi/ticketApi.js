import projectApi from "../axios/axios";

export const getTicketList = async () => {
  const response = await projectApi.get("notes");
  return response.data;
};

export const getTicket = async (id) => {
  const response = await projectApi.get(`"notes/${id}`);
  return response.data;
};
