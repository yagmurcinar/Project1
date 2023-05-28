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

export const getLessons = () => {
       const token = localStorage.getItem("token");
      options.headers.Authorization = `Bearer ${token}`;
      options.method = 'GET';
      options.url = `${apiUrl}/Lesson`

      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
        response.data);
        return dataPromise;
}
export const getLessonById = (id:number) => {
      const token = localStorage.getItem("token");
      options.headers.Authorization = `Bearer ${token}`;
      options.method = 'GET';
      options.url = `${apiUrl}/Lesson/${id}`

      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
        response.data);
        return dataPromise;
}
