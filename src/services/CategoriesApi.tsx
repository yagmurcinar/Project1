import axios from "axios";
import { apiUrl } from "./apiUrl";

let options = {
    method:'',
    url:apiUrl,
    headers: {
        Authorization:'',
        contentType:''
    },
    data:{}
}

export const getCategories = () => {
       const token = localStorage.getItem("token");
      options.headers.Authorization = `Bearer ${token}`;
      options.method = 'GET';
      options.url = `${apiUrl}/Category`

      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
        response.data);
        return dataPromise;
}
