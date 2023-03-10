import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const {user,dispatch}=useContext(AuthContext)
console.log(user)
  useEffect(() => {
    if(user){
    getData(url)
    }
  }, [url,user]);

  
  const getData = (url) => {
    fetch(url,{
      headers:{'Authorization': `Bearer ${user.token}`},
    })
      .then((res) => {
        if (!res.ok) {
          dispatch({type:"LOGOUT",payload:null})
          throw Error("Could not fetch data for that resource");
          
        }
        return res.json();
      })
      .then((data) => {setData(data); setIsLoading(false)})
      .catch((Error)=>{setError(Error.message);setIsLoading(false)})
 



  };


  return [data,isLoading,error];
};
