/* eslint-disable jsx-a11y/img-redundant-alt */
import {  useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import './basket.css'
import { GetMyLearningByUserId } from "../services/MyLearningApi";

export default function MyLearning() {
  const  [myLearningList,setMyLearningList] = useState([] as any[])


  useEffect(()=>{
     const userIdLocal = localStorage.getItem("userId");
     const userId =  userIdLocal !=null ? parseInt(userIdLocal) : 0;
    GetMyLearningByUserId(userId).then((data:any[])=>{
      setMyLearningList(data);
    })
  },[])
  return (
    <div>
    
           {myLearningList.map((mylearning:any) => {
            return(
             <Card>
              <Card.Body>
                <div className="row">
                  <div className="col-md-3">
                    <img className="card-img-top" src={mylearning.lesson.image} alt="Card image cap"></img>
                  </div>
                    <div className="col-md-9">
                    <h4>{mylearning.lesson.title}</h4>
                    <p>{mylearning.lesson.description}</p>
                  </div>
                  
                </div>
              </Card.Body>
            </Card>
            )
              })}
    </div>
  )
}



// import React from 'react';
// import "./myLearning.css";

// export default function MyLearning() {
     
//   return (
//     div className='myLearning-main'>
//     <div className='myLearning-nav'>
//       My Lessons
//     </div>
//       <div className='mylearning-body'>
//         My Lessons
//       </div>
//       </div><
//   )
// }
