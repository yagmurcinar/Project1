import React, { useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Lessons from './components/Lessons';
import LoginForm from './components/LoginForm';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import { lessonContext } from './context/Context';
import Footer from './components/Footer';
import MyLearning from './components/MyLearning';
import Basket from './components/Basket';
import ShowCardDetails from './components/ShowCardDetails';

function App() {
  
 const [lessons, setLessons] = useState([] as any[]);
    const [filterLessons, setFilterLessons] = useState([] as any[]);
     const [basketList, setBasketList] = useState([] as any[]);
  return (
    <div className="App">
      <lessonContext.Provider value={{lessons,setLessons,filterLessons,setFilterLessons,basketList,setBasketList}}>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Lessons/>} />
          <Route path='/mylearning' element={<MyLearning/>} />
          <Route path='/basket' element={<Basket/>} />
          <Route path='/showcarddetails' element={<ShowCardDetails />} />
          <Route path='/login' element={<LoginForm/>} />
          <Route path='/signin' element={<SignIn/>} />
        </Routes>
        <Footer/>
      </lessonContext.Provider>
    </div>
  );
}

export default App;
