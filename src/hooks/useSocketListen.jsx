import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export const useSocketListen = ({ event, projectId }) => {
  const queryClient = useQueryClient();

  socket.on(`${event}`, ({ id, status }) => {
    if (id === projectId && status === "update") {
      queryClient.invalidateQueries(["project"]);
    }
  });
  return popupMessage;
};
