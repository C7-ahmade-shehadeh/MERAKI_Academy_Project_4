import React, { useContext, useEffect, useState } from "react";
import { Nav, Button,Card } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link,NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import "./Navbar.css";
import axios from "axios";
import "../Dashtest/Dashboard.css";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Navbar = () => {
  const token = localStorage.getItem("token");
  // const [products, setProducts] = useState("");
  
const [search2, setSearch2] = useState("");
const [add, setAdd] = useState(false);
  const [cat, setCat] = useState([]);
  const { cartL ,setProducts,emaleName,
    photo} = useContext(UserContext);
  const role =localStorage.getItem('role')
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        res.data.result.forEach(element => {
         
         
          if (!(cat.includes(element.kind))) {
            cat.push(element.kind)
          }
          
       });
       console.log('cat',cat);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //todo search function
const search = () => {
  // const searchItem={searchItem:value}
  console.log("search2: ", search2);
  axios
    .post(`http://localhost:5000/product/search`, { searchItem: search2 })

    .then((res) => {
      console.log(res.data.post);
      setProducts(res.data.post);
    })
    .catch((err) => {
      console.log(err);
    });
};
const searchkind = (searchItem) => {
  // const searchItem={searchItem:value}

  console.log("searchItem: ", searchItem);
  console.log(token);
  axios
    .get(`http://localhost:5000/product/searchkind/?search=${searchItem}`)

    .then((res) => {
      console.log(res.data.post);
      setProducts(res.data.post);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
  return (
    <div>
      <div className="Navbar">
       {photo ?
         <img className="imglogo" 
         src={photo}></img> :
          <img className="imglogo" 
          src="Screenshot_2.png"></img>}
       
       
        <div className="new-nav">
        <div className="list">
          
          <label className="labelc"> category:</label>
          <select
          className="select"
            name="category"
            id="category"
            onClick={(e) => {
              const searchItem = e.target.value;
              searchkind(searchItem);
            }}
          >
            {  cat.map(element => {
              console.log('element',element);
                return (<option >{element}</option>)
            })}
          </select>
</div>
<div className="headarsearch">
          <label>
            <i>
              {" "}
              <SearchIcon className="icon" onClick={search} />
            </i>
          </label>
          <input
            className="inputsearch"
            type={"text"}
            placeholder={`Search ..`}
            onChange={(e) => {
              const searchval = e.target.value.toLocaleLowerCase();
              setSearch2(searchval);
            }}
          ></input>
          </div>
      </div>
        {token ? (
          <>
            <div className="loginAndRegistar">
              { role == 'USER' ?
              <>
              
             <>
             <NavLink to="/Dashtest" className="componentnav Dashboard">
                Dashboard
              </NavLink>
               <NavLink to="/Cart">
               <button className="ShoppingIcon componentnav">
                 <Badge badgeContent={cartL} max={9} color="info">
                   <ShoppingCartOutlinedIcon className="ShoppingIcon" />
                 </Badge>{" "}
               </button>{" "}
             </NavLink></>
             <NavLink to="/login" className="componentnav out" 
             onClick={()=>{
              localStorage.removeItem('token')
              setAdd(false)
             }}>
              logout
              </NavLink>
             </>
              :
              <>
               <>
                {"  "}
                <NavLink to="/Add" 
              className="componentnav ">
                <button className="btnheader ">
                  <AddCircleOutlineOutlinedIcon/>
                  Product
                </button>
              </NavLink>
                
              </>
              <NavLink to="/Dashboard" className="componentnav">
              Dashboard
              </NavLink> 
              <NavLink to="/login" className="componentnav out">
              logout
              </NavLink> 
              
              
              </>}
            </div>
          </>
        ) : (
          <>
            <div className=" loginAndRegistar">
            <NavLink to="/Register" relative="path"
              
              className="componentnav ">
                Register
              </NavLink>

              <NavLink exact to="/Login" className="componentnav ">
               
                Login
              </NavLink>
       
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

//*<ListGroup horizontal>

{
  /* <ListGroup.Item> <Nav.Item>
<Nav.Link href="/Register" className='componentnav'>Register</Nav.Link>
</Nav.Item>
</ListGroup.Item>
<ListGroup.Item>
<Nav.Item>
<Nav.Link href="/Login"className='componentnav'>Login</Nav.Link>
</Nav.Item>
</ListGroup.Item> */
}

// </ListGroup>
