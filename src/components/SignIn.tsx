import React,{useState}from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './login.css';
import { Signin } from '../requests/login';

interface isActiveForm {
  name:string,
  surname:string,
  email:string,
  password:string
}
 function SignIn(){
  
      return(
  
  <div className='container'>
     <Formik 

     initialValues={{
      name:"",
      surname:"",
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
         Signin(values).then((data)=>{
          if(data!= null){
            alert("sıgn")
          }else
          alert("not")
         })
       }

     }>
      
      {({handleSubmit,handleChange,values,errors})=>(
       <form onSubmit={handleSubmit} className='form-group'>
        <h4>Sign up and start learning</h4>
        <div id="float-label">
           <Field  type='text'  name='name' id='name' value={values.name} onChange={handleChange}  required/>
           <label htmlFor="name" className={ values.name!=='' ? "Active" : ""} >Name</label>
           {errors.name}
        </div>
        <div id="float-label">
           <Field  type='text'  name='surname' id='surname' value={values.surname} onChange={handleChange}  required/>
           <label htmlFor="name" className={ values.name!=='' ? "Active" : ""} >Surname</label>
           {errors.surname}
        </div>
        
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
          <button className='btn-type' type='submit'>Sign In</button>
       </div>
        
      </form>
      )}
      
     </Formik>
      
    </div>
      )
 }

export default SignIn;