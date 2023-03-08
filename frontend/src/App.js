import "./App.css";
import React from "react";
import {Routes,Route,Link} from "react-router-dom"
// import Navbar from './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar'
import Login from './components/login/Login'
import Register from './components/Register/Register'
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>E-Commerce Website </h1>
      </header>

      <Navbar/>
      <Routes>
<Route path='/Register' element={<Register/>} />
<Route path='/Login' element={<Login/>}/>
<Route path='/Dashboard' element={<Dashboard/>}/>



      </Routes>
    </div>
  );
}

export default App;
