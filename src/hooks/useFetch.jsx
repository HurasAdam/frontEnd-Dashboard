import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
const {user,dispatch}=useContext(AuthContext)

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
        if (res.status===401) {
          dispatch({type:"LOGOUT",payload:null})
          
          localStorage.removeItem('user')
          throw Error("Unauthorized, You have to be sign in!"); 
        }
        if(res.status===403){
          throw Error("You dont have permission for that resource");
        }
        return res.json();
      })
      .then((data) => {setData(data); setIsLoading(false)})
      .catch((Error)=>{setError(Error.message);setIsLoading(false)})
 



  };


  return [data,isLoading,error];
};
