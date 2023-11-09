import { useState } from "react";
import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:3000");

export const useSocketListen = ({event, queryKey }) => {
  const queryClient = useQueryClient();
  socket.on(event, (eObject) => {
    if (eObject.status === "update") queryClient.invalidateQueries([`${queryKey}`]);
  });
};

