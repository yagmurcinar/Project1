import axios from "axios";
import { apiUrl } from "../requests/apiConfig";

let options = {
    method:'',
    url:apiUrl,
    headers: {
        Authorization:'',
        contentType:''
    },
    data:{}
}
export const GetMyLearningByUserId = (id:number) =>{
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  options.method = 'GET';
  options.url = `${apiUrl}/MyLearning/GetMyLearningByUserId/${id}`
      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
      response.data);
        return dataPromise;
}
