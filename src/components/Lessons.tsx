import React, { useEffect, useContext } from 'react';
import mainseco from '../picture/mainseco.jpg';
import './lessons.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getLessons } from '../services/LessonApi';
import CardItem from './CardItem';
import { lessonContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';


export default function Lessons() {
    const token:string | null = localStorage.getItem('token');
    let navigate = useNavigate()
 if(!token){
       navigate('/login')
    }
    const  {filterLessons,setLessons,setFilterLessons}:any = useContext(lessonContext);
   
    let columnsPerRow = 4;

     useEffect(() => {
        getLessons().then((data:any[])=>
       {
         setLessons(data);
         setFilterLessons(data);
          //columnsPerRow = data.length < 4 ? columnsPerRow=data.length : columnsPerRow;
       }
        )     
   },[])
  
  return (
    <>
    <div>
       <img className='mainpic' src={mainseco} alt='reactlogo'/>
    </div>
   
    <Container className='lessonscontainer'>
          <Row xs={1} md={filterLessons.length < 4 ? filterLessons.length : columnsPerRow}>
             
             {filterLessons.map((lesson:any, index:number) => {
          return ( 
            <Col className='cardCol' key={index}>
     <CardItem lesson={lesson} index={index}/>
        </Col>
          );
   
      })}
                
          </Row>
      </Container> 
    </>
  )
}


