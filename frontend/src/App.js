import "./App.css";
import React,{createContext,useState} from "react";
import {Routes,Route,Link} from "react-router-dom"
// import Navbar from './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart/Cart";
export const UserContext =createContext()
function App() {
  const [cartL, setCartL] = useState(0)
  return (
    <div className="App">
      <UserContext.Provider value={{cartL,setCartL}}>
      <header className="App-header">
        <h1>E-Commerce Website </h1>
      </header>

      <Navbar/>
      <Routes>
<Route path='/Register' element={<Register/>} />
<Route path='/Login' element={<Login/>}/>
<Route path='/Dashboard' element={<Dashboard/>}/>
<Route path='/Cart' element={<Cart/>}/>



      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
