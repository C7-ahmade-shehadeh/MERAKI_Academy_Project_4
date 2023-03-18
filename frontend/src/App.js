import "./App.css";
import React,{createContext,useState} from "react";
import {Routes,Route,Link} from "react-router-dom"
// import Navbar from './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart/Cart";
import Dashtest from "./components/Dashtest/Dashtest";
import Add from './components/Add'
export const UserContext =createContext()
function App() {
  const [products, setProducts] = useState("");
  const [photo, setPhoto] = useState("");
  const [emaleName, setEmaleName] = useState("");

  const [cartL, setCartL] = useState(0)
//E-Commerce Website }

  return (
    <div className="App">
      <UserContext.Provider
       value={{emaleName, setEmaleName,photo, setPhoto,cartL,setCartL,setProducts,products}}>
      <header className="App-header">
       
      </header>
      <Navbar className='nav'/>
   
      <Routes>
<Route path='/Register' element={<Register/>} />
<Route path='/Login' element={<Login/>}/>
<Route path='/Dashboard' element={<Dashboard/>}/>
<Route path='/Cart' element={<Cart/>}/>
<Route path='/Dashtest' element={<Dashtest/>}/>
<Route path='/Add' element={<Add/>}/>





      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
