import axios from "axios";
import { apiUrl } from "../requests/apiConfig";

export type cardModelType = {
    id?:number, 
    userId:number,
    lessonId:number,
    createdDate?:Date
}
let options = {
    method:'',
    url:apiUrl,
    headers: {
        Authorization:'',
        contentType:''
    },
    data:{}
}
export const addToCard = (cardModel:cardModelType) =>{
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  options.method = 'POST';
  options.url = `${apiUrl}/Basket/AddToCard`
  options.data = cardModel;
      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
      response.data);
        return dataPromise;
}
export const GetBasketList = (id:number) =>{
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  options.method = 'GET';
  options.url = `${apiUrl}/Basket/GetBasketByUserId/${id}`
      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
      response.data);
        return dataPromise;
}

export const DeleteBasketById = (id:number) =>{
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  options.method = 'GET';
  options.url = `${apiUrl}/Basket/DeleteBasketById/${id}`
      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
      response.data);
        return dataPromise;
}



export const SaveBasket = (basket:any) =>{
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  options.method = 'POST';
  options.url = `${apiUrl}/MyLearning/AddToMyLearning`;
  options.data = basket;
      const promise = axios.request(options);
      const dataPromise = promise.then((response)=>
      response.data);
        return dataPromise;
}

