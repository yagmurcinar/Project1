import { Button, ButtonToolbar, Card,OverlayTrigger,Popover} from 'react-bootstrap';
import './carditem.css';
import { addToCard } from '../services/BasketApi';
import { useNavigate } from 'react-router-dom';


export default function CardItem(props:any) {

  const navigate=useNavigate();

 function GoShowDetails(id:number){
 navigate("/ShowCardDetails",{state:{id:id}});
}
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
    function popover(item:any){
  return(
    <Popover  id={"popover-positioned-right-"+item.id} title="Popover right">
      <div className='popover-main'>
        <div className='popover-title'>
          <strong>{item.title}</strong><br/> 
      </div>     
      <div  className='popover-price'>
          <p>{item.description}</p>
      </div>
      <div className='popover-btn'>
        <Button className='addToCard' onClick={()=>{GoShowDetails(item.id)}} variant="success">Get Detail</Button>  
        <Button className='addToCard' onClick={()=>{AddBasket(item.id)}} variant="success">Add To Card</Button>
      </div>
      </div>
    </Popover>
  );
}

  return (
    <OverlayTrigger trigger="click" placement={props.index %4 === 3 ? "left" : "right"} overlay={popover(props.lesson)}>
      <Card className='cardgroup' style={{marginTop:"10px",marginBottom:"10px",marginLeft:"10px",marginRight:"10px"}}>
      <Card.Img className='card-pic' variant="top" src={props.lesson.image} />
      <Card.Body>
        <Card.Title className='mt-2'>{props.lesson.title}</Card.Title>
           <ButtonToolbar>
  </ButtonToolbar>
        <Card.Text className='card-instructor'>
          {props.lesson.instructor} <br></br>
           {"Points: "+ props.lesson.point}
            <p className='mt-2'>{"₺"+props.lesson.price}</p>
        </Card.Text>   
      </Card.Body>
    </Card>
        </OverlayTrigger>
  )
}