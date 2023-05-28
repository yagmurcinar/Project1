import { Button, Card } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import './showcarddetails.css';
import { getLessonById} from '../services/LessonApi';
import { useEffect, useState } from 'react';
import { getCategories } from '../services/CategoriesApi';
import { addToCard } from '../services/BasketApi';

const ShowCardDetails = () => {
  
  function AddBasket(id:number){
         const userIdLocal = localStorage.getItem("userId");
         const userId =  userIdLocal !=null ? parseInt(userIdLocal) : 0;
           let result = addToCard({userId:userId, lessonId:id});
   result.then((res:any)=>{
    console.log("res",res);
    if (res){
      alert("basket");
    }else{
      alert('giriş başarısız ')
    }
    
   })
   result.catch((err)=>{
    console.log(err.message);
    
   })
  }
  function CategoryRecursive(myCategory:any,list: any[]){
          list.push(myCategory.name)
          if(myCategory.top != null){
            CategoryRecursive(myCategory.top, list);
          }
          return list;
  }
 const location = useLocation();
 const id = location.state.id;
 const [categoryName, setCategoryName] = useState("");
 const [cardDetail,setCardDetail] = useState({} as any)
       useEffect(() => {
        getLessonById(id).then((data:any)=>
       {
         setCardDetail(data);
         getCategories().then((data2)=>{
          const myCategory = data2.find((x:any)=>x.id === data.categoryId)
          let categoryItemName = "";
           console.log("myc " ,myCategory);
           
           const dataArray = CategoryRecursive(myCategory,[]);
           dataArray.reverse().map((item:any)=>{
             categoryItemName += item + " > ";
           })
           categoryItemName = categoryItemName.slice(0, -3);
           setCategoryName(categoryItemName);
         })
       }
        )     
   },[])

  return (
   
        <div className='row'>
          <div className='col-md-8 card-groups-leftside'>
               <h6 className="subtitle">{categoryName}</h6>
                   <h2 className="subtitle">{cardDetail.title}</h2>
                     <p><h5 className='subtitle'>{cardDetail.description}</h5> </p>
                     <p><h5 className='subtitle'>{cardDetail.instructor}</h5> </p>
                      <p><h5 className='subtitle'>{"Point: " + cardDetail.point}</h5> </p>
                      <Button className=' btnAddToCard' onClick={()=>{AddBasket(cardDetail.id)}} variant='success'>Add To Card</Button>
          </div>
           <div className='col-md-4 card-groups-rightside'>
              <Card className='cardgroup' style={{marginTop:"10px",marginBottom:"10px",marginLeft:"10px",marginRight:"10px"}}>
                      <iframe src="https://www.youtube.com/embed/upDLs1sn7g4" title="What is JavaScript?"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                     <Card.Body>
                      <Card.Title className='mt-2'>{cardDetail.title}</Card.Title>
                       <Card.Text className='card-instructor'>
                         <p className='mt-2'>{"₺"+cardDetail.price}</p>
                       </Card.Text>   
                     </Card.Body>
                  </Card>
           </div>
        </div>    
  
  )
}

export default ShowCardDetails;

//  <Card>
//               <Card.Body>
//                 <div className="row card-groups">
//                   <div className="col-md-8 card-groups-leftside">
//                     <h6 className="subtitle">{categoryName}</h6>
//                    <h2 className="subtitle">{cardDetail.title}</h2>
//                     <p><h5 className='subtitle'>{cardDetail.description}</h5> </p>
//                     <p><h5 className='subtitle'>{cardDetail.instructor}</h5> </p>
//                      <p><h5 className='subtitle'>{"Point: " + cardDetail.point}</h5> </p>
//                      <Button className=' btnAddToCard' variant='success'>Add To Card</Button>
//                   </div>
                  
//                     <div className="col-md-4 card-group-rightside">
//                 <Card className='cardgroup' style={{marginTop:"10px",marginBottom:"10px",marginLeft:"10px",marginRight:"10px"}}>
//                      <iframe src="https://www.youtube.com/embed/upDLs1sn7g4" title="What is JavaScript?"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
//                     <Card.Body>
//                       <Card.Title className='mt-2'>{cardDetail.title}</Card.Title>
//                        <Card.Text className='card-instructor'>
//                          <p className='mt-2'>{"₺"+cardDetail.price}</p>
//                       </Card.Text>   
//                     </Card.Body>
//                  </Card>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>