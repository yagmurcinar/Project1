import axios from "axios";
import { apiUrl } from "./apiConfig";

export type LoginModelType = {
    email:string, 
    password:string
}
export const submitHandle = (loginModel:LoginModelType) =>{

console.log(loginModel);

const promise = axios.post(`${apiUrl}/Auth`,{
    email: loginModel.email,
    password: loginModel.password
  })
const dataPromise = promise.then((response)=>response.data)
console.log(dataPromise);
return dataPromise;

}
export const Signin = (loginModel:any) =>{

console.log(loginModel);

const promise = axios.post(`${apiUrl}/Auth/CreateUser`,{
    name : loginModel.name,
    surname: loginModel.surname,
    email: loginModel.email,
    password: loginModel.password
  })
const dataPromise = promise.then((response)=>response.data)
console.log(dataPromise);
return dataPromise;

}