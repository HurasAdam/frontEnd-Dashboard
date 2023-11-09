import { useQuery, useMutation, useQueryClient, useQueries } from "react-query";

export const mutationHandler= (mutationFn,mutationCallback)=>{

     const  mutation= useMutation(mutationFn,{
      onSuccess:mutationCallback
    })
    return mutation
  }