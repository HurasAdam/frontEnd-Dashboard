import { useEffect, useState } from "react";
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://127.0.0.1:3000/api/notes")
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch data for that resource");
        return res.json();
      })
      .then((data) => {setData(data); setIsLoading(false)})
      .catch((Error)=>{setError(Error.message);setIsLoading(false)})
 



  };


  return [data,isLoading,error];
};
