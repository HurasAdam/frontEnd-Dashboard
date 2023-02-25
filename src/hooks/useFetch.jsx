import { useEffect, useState } from "react";
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(url);
  }, [url]);

  const getData = (url) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw Error("Could not fetch data for that resource");
        return res.json();
      })
      .then((data) => {setData(data); setIsLoading(false)})
      .catch((Error)=>{setError(Error.message);setIsLoading(false)})
 



  };


  return [data,isLoading,error];
};
