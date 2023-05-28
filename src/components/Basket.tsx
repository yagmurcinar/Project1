/* eslint-disable jsx-a11y/img-redundant-alt */
import {  useEffect, useContext } from "react";
import {  DeleteBasketById, GetBasketList, SaveBasket } from "../services/BasketApi";
import { lessonContext } from "../context/Context";
import { Button, Card } from "react-bootstrap";
import './basket.css'

export default function Basket() {
  const  {basketList,setBasketList}:any = useContext(lessonContext);
  let totalPrice=0;

  function RemoveItem(id:number){
    DeleteBasketById(id).then(
      (data)=>{
          const userIdLocal = localStorage.getItem("userId");
          const userId =  userIdLocal !=null ? parseInt(userIdLocal) : 0;
          GetBasketList(userId).then((data2)=>{
            setBasketList(data2)
          })
      }
    )
  }
  const BuyBasketList=()=>{
    basketList.map((basket:any)=>{
       SaveBasket({userId:basket.user.id,lessonId:basket.lesson.id}).then((data:any)=>{
        if(data!=null){
          DeleteBasketById(basket.id).then((data2:any)=>{
            const userIdLocal = localStorage.getItem("userId");
            const userId =  userIdLocal !=null ? parseInt(userIdLocal) : 0;
            GetBasketList(userId).then((data3:any[])=>{
              setBasketList(data3);
            })
          })
        }
      })  
    })
  }
  useEffect(()=>{
     const userIdLocal = localStorage.getItem("userId");
     const userId =  userIdLocal !=null ? parseInt(userIdLocal) : 0;
    GetBasketList(userId).then((data:any[])=>{
      setBasketList(data);
    })
  },[])
  return (
    <div>
      <div className="row">
<div className="col-md-9">
    
           {basketList.map((basket:any) => {
            totalPrice+=basket.lesson.price;
           
            return(
             <Card>
              <Card.Body>
                <div className="row">
                  <div className="col-md-3">
                    <img className="card-img-top" src={basket.lesson.image} alt="Card image cap"></img>
                  </div>
                    <div className="col-md-6">
                    <h4>{basket.lesson.title}</h4>
                    <p>{basket.lesson.description}</p>
                  </div>
                  <div className="col-md-3">
                    <strong>{basket.lesson.price} TL</strong><br/>
                    <Button className="removeToCard"  onClick={()=>{RemoveItem(basket.id)}} variant="secondary">Remove</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            )
              })}
              </div>
              <div className="col-md-3"><div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">Toplam</h5>
    <p className="card-text">{totalPrice.toFixed(2) + "₺"}</p>
    <Button className="removeToCard" onClick={BuyBasketList} variant="info">Buy</Button>
  </div>
</div></div>
     </div>
    </div>
  )
}
