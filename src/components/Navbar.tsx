import { Link } from 'react-router-dom';
import './navbar.css';
import Categories from "./Categories";
import { useContext,useState } from "react";
import { lessonContext } from '../context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
   let navigate = useNavigate()
 
   function SearchOnChange(e:any){
     
    setSearchText(e.target.value);
    if(searchText.length>= 3){
      filterCardByText(searchText,e)
    }

   }

const token:string | null = localStorage.getItem('token');
const user:any | null =localStorage.getItem('user');
const[searchText, setSearchText] = useState("");
const  {lessons,setFilterLessons,filterLessons}:any = useContext(lessonContext);
const filterCardByText = (text:string,e:any)=>{
  e.preventDefault();
  text = text.toLowerCase();
    setFilterLessons(lessons.filter((x:any)=>x.title.toLowerCase().includes(text) || x.description.toLowerCase().includes(text) || x.instructor.toLowerCase().includes(text))); 
    console.log(filterLessons);
    
    }
    const  logOut=()=>{
      localStorage.removeItem("token");
      navigate("/login");
      
    }
  return (
        <div className='header-group'>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
     
  <div className="collapse navbar-collapse navbar-group">
    <ul className="navbar-nav navbar-style">
      <li className="nav-item active">
         <Link className="navbar-brand" to="/" style={{textDecoration:"none"}}>Udemy</Link>
      </li>
    </ul>
  </div>

  <div className="collapse navbar-collapse navbar-group ">
    <ul className="navbar-nav categories-style">
      <li className="nav-item active nav-link">
        <Categories lessons={lessons }/>
      </li>
    </ul>
  </div>
  {/* <div className="dropdown collapse navbar-collapse navbar-group ">
    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Tutorials
    <span className="caret"></span></button>
    <ul className="dropdown-menu">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li className="dropdown-submenu">
        <a className="test" href="#">New dropdown <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li><a href="#">2nd level dropdown</a></li>
          <li><a  href="#">2nd level dropdown</a></li>
          <li className="dropdown-submenu">
            <a className="test" href="#">Another dropdown <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">3rd level dropdown</a></li>
              <li><a href="#">3rd level dropdown</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div> */}
  <div className='navbar-group button-input-group'>
     <form className='input-style' onSubmit={(e)=>{filterCardByText(searchText,e)}}>
      <button className="btn" type="submit"><i className="fa fa-search" aria-hidden='true'></i></button>
       <input type="text" placeholder='Search' onChange={(e)=>{SearchOnChange(e)}} />
     </form>
  </div>
    {
      
      !!token ? (
        
    <div className='login-signin navbar-group login-signin'>
      <div className="collapse navbar-collapse  my-learning">
    <ul className="navbar-nav categories-style">
      <li className="nav-item active">
        <Link className="nav-link " to="/mylearning" style={{textDecoration:"none"}} >My Learning</Link>
      </li>
    </ul>
  </div>
    <div className="collapse navbar-collapse" >
     <ul className="navbar-nav  login">
      
        <li className="nav-item dropdown">
        <Link className="nav-link " to="#" id="navbarDropdown"  style={{textDecoration:"none"}}  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {user}
        </Link>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" style={{textDecoration:"none"}} to="/mylearning">My Learning</Link>
          <Link className="dropdown-item" style={{textDecoration:"none"}} to="/basket">Sepete Git</Link>
          <Link className="dropdown-item" style={{textDecoration:"none"}} onClick={logOut} to="/login">Çıkış Yap</Link>
          
        </div>
      </li>
      </ul>
      </div>
      </div>

      ) : (
     <div className='login-signin navbar-group login-signin'>
     <div className="collapse navbar-collapse" >
    <ul className="navbar-nav  login">
      <li className="nav-item active">
        <Link className="nav-link link-style"  style={{textDecoration:"none"}} to="/login">Log in</Link>
      </li>
    </ul>
  </div>

  <div className="collapse navbar-collapse ">
    <ul className="navbar-nav signin">
      <li className="nav-item active">
        <Link className="nav-link link-style"  style={{textDecoration:"none"}} to="/signin">Sign in</Link>
      </li>
    </ul>
  </div>
  </div>
      )
    }
</nav>
</div>
  )
}



{/* <div className="collapse navbar-collapse navbar-group ">
    <ul className="navbar-nav categories-style">
      <li className="nav-item active">
        <Link className="nav-link" to="/"><Categories lessons={lessons }/></Link>
      </li>
    </ul>
  </div>

  <div className='navbar-group button-input-group'>
     <form className='input-style' onSubmit={(e)=>{filterCardByText(searchText,e)}}>
      <button className="btn" type="submit"><i className="fa fa-search" aria-hidden='true'></i></button>
       <input type="text" placeholder='Search' onChange={(e)=>{setSearchText(e.target.value)}} />
     </form>
  </div> */}


  //////////////////////////////////////////

