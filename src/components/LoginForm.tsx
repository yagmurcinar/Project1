
import React,{useState}from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './login.css';
import { submitHandle,LoginModelType } from '../requests/login';
import { useNavigate } from 'react-router-dom';

interface isActiveForm {
  name:string,
  email:string,
  password:string
}
type resultType = {
    token:string;
    isAuthenticated:boolean;
    user:any;
}
 function LoginForm(){
  const token:string | null = localStorage.getItem('token');
    let navigate = useNavigate()
    if(!!token){
       navigate('/')
    }
    const [user, setUser] = useState({} as LoginModelType);
      return(
  
  <div className='container'>
     <Formik 

     initialValues={{
      name:"",
      email:"",
      password:""
     }}

            validate={values => {
         const errors:any = {};
         if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'This is not a valid email address.';
         }
         return errors;
       }}

        onSubmit={(values:isActiveForm) => {
             let result = submitHandle({email:values.email, password:values.password});
   result.then((res:resultType)=>{
    console.log(res);
    if (res.isAuthenticated){
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', res.user.name + " " + res.user.surname)
        localStorage.setItem('userId', res.user.id)
        navigate('/')
    }else{
      alert('giriş başarısız ')
    }
    
   })
   result.catch((err)=>{
    console.log(err.message);
    
   })
     
       }

     }>
      
      {({handleSubmit,handleChange,values,errors})=>(
       <form onSubmit={handleSubmit} className='form-group'>
        <h4>Log in to your Udemy account</h4>
       
        <div id="float-label"> 
          <Field type='email' name='email' id='email' value={values.email} onChange={handleChange} required />
          <label htmlFor="email" className={  values.email!=='' ? "Active" : ""}>Email</label>
          {errors.email}
       </div>

       <div id="float-label"> 
          <Field type='text' name='password' id='password' value={values.password} onChange={handleChange} required/>
          <label htmlFor="password" className={  values.password!=='' ? "Active" : ""}>Password</label>
          {errors.password}
       </div>
       
       <div id="float-label">
          <button className='btn-type' type='submit'>Submit</button>
       </div>
        
      </form>
      )}
      
     </Formik>
      
    </div>
      )
 }

export default LoginForm;

//  function handleTextChange(text:string,input:string) {
//   if(input==="name"){
//     setValue({...value,name:text});
//     const deger:boolean=text==="";
//     setIsActive({...isActive,name:deger});
//   }
//   else if(input==="email"){
//     setValue({...value,email:text});
//         const deger:boolean=text==="";
//     setIsActive({...isActive,email:deger});
//   }
//   else if(input==="password"){
//     setValue({...value,password:text});
//         const deger:boolean=text==="";
//     setIsActive({...isActive,password:deger});
//   }
  

  
//   }