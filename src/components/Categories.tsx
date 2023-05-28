import './categories.css';
import { useEffect, useState, useContext} from 'react';
import { getCategories } from '../services/CategoriesApi';
import { lessonContext } from '../context/Context';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';


export default function Categories(props:{lessons:any}) {
  const  {lessons,setFilterLessons}:any = useContext(lessonContext);
  let token:string | null = localStorage.getItem('token');
  const [categories, setCategories] = useState([] as any[])
function RecursiveCategories(categories:any){
  
  return (
       <>
         {
          categories.map((category:any)=>{
             let clickItem=category.inverseTop.length===0;
             if(clickItem){
              return( 
            <Dropdown.Item  onClick={()=>{ filterCard(category.id)}}>{category.name}</Dropdown.Item>
            )
            } else
              return(
              <Dropdown.Menu title={category.name}> 
                {
                 RecursiveCategories( category.inverseTop)
                }
              </Dropdown.Menu>
              )
            
          })
         }
        </>
  )
}


   const filterCard = (id:number)=>{
    
      setFilterLessons(lessons.filter((x:any)=>x.categoryId === id)); 
    
    }
   
  useEffect(() => {
        getCategories().then((data:any[])=>
       {
         setCategories(data.filter(x=>x.topId==null));
         console.log(data.filter(x=>x.topId==null));
         
       }
        )     
      
   },[])
  return (
   <>
   {
     <Dropdown title="Categories" className='navbar-group'>
     { RecursiveCategories(categories) }
      </Dropdown>
     }
   </>
  )
}





 {/* <Dropdown.Item>Item</Dropdown.Item>
                <Dropdown.Menu title="Item 2">
                    <Dropdown.Item>Item 2A</Dropdown.Item>
                    <Dropdown.Item>Item 2B</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Menu title="Item 4">
                    <Dropdown.Menu title="Item 4A">
                        <Dropdown.Item>Item 4A-A</Dropdown.Item>
                        <Dropdown.Item>Item 4A-B</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item>Item 4B</Dropdown.Item>
                </Dropdown.Menu> */}