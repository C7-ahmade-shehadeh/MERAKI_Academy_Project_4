import React, { useContext, useEffect, useState } from "react";
import { Nav, Button,Card } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
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
  const [kind, setKind] = useState("");
 const [name, setName] = useState("");
const [search2, setSearch2] = useState("");
const [add, setAdd] = useState(false);
  const [cat, setCat] = useState([]);
  const { cartL ,setProducts,emaleName,
    photo} = useContext(UserContext);
  const role =localStorage.getItem('role')
  console.log("cartl: ", cartL);
  console.log("role: ", role);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res',res);
        res.data.result.forEach(element => {
          console.log('element.kind',element.kind);
          // setCat(cat=>[...cat,element.kind])
          console.log(!(cat.includes(element.kind)));
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
       {photo ?  <img className="imglogo" src={photo}></img> : <img className="imglogo" src="Screenshot_2.png"></img>}
       
       
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
            placeholder="Search .."
            onChange={(e) => {
              const searchval = e.target.value.toLocaleLowerCase();
              setSearch2(searchval);
            }}
          ></input>
          </div>
        
        {/* <div>
          {console.log(role)}
          {role == "UDMIN" ? (
            add ? (
              <div className="addproduct">
                <Card className="text-center">
                  <Card.Header as="h5">
                  <label className="labelkind"> kind:</label>
                  <select
          className="selectadd"
            name="category"
            id="category"
            onClick={(e) => {
              const kind = e.target.value;
              searchkind(kind);
            }}
          >
          
             <option value="clothes">clothes</option>
            <option value="watch">watch</option>
            <option value="Perfumes and makeup">Perfumes and makeup</option>
            <option value="Cap and scarf">Cap and scarf</option> 
          </select>
          
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <input
                        type={"text"}
                        placeholder="name .."
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      ></input>
                    </Card.Title >
                    <Card.Text>
                      <textarea
                        type={"text"}
                        placeholder="description .."
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <p>
                        {" "}
                        <input
                          type={"text"}
                          placeholder="manufacturingyear .."
                          onChange={(e) => {
                            setManufacturingyear(e.target.value);
                          }}
                        ></input>
                      </p>
                      <p>
                        {" "}
                        <input
                          type={"text"}
                          placeholder="price .."
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        ></input>
                      </p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <p>
                      {" "}
                      <input
                        type={"text"}
                        placeholder="delivery :yes/no"
                        onChange={(e) => {
                          setDelivery(e.target.value);
                        }}
                      ></input>
                    </p>{" "}
                    <p>
                      {" "}
                      <input
                        type={"text"}
                        placeholder="state:new/used"
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      ></input>
                    </p>
                    <input
                      type="text"
                      placeholder="add imge"
                      onChange={(e) => {
                        setImg(e.target.value);
                      }}
                    ></input>
                    <br></br>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setAdd(false);
                      }}
                    >
                      {" "}
                      <ArrowBackOutlinedIcon />
                      back
                    </Button>
                    {"    "}
                    <Button
                      variant="success"
                      onClick={() => {
                        AddProduct();
                        setAdd(false);
                      }}
                    >
                      {" "}
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ) : (
              <>
                {"  "}
                <Link to="/Add" 
              className="componentnav ">
                <Button
                  className="btnheader icon"
                  
                  variant="primary"
                  onClick={() => {
                    setAdd(true);
                  }}
                >
                  {" "}
                  <AddCircleOutlineOutlinedIcon />
                  Product
                </Button>
              </Link>
                
              </>
            )
          ) : (
            <></>
          )}
        </div> */}
      </div>
        {token ? (
          <>
            <div className="loginAndRegistar">
              <Link to="/Register" relative="path"
              className="componentnav ">
                Register
              </Link>

              <Link to="/Login" className="componentnav ">
                Login
              </Link>
             { role == 'USER' ?<Link to="/Dashtest" className="componentnav Dashboard">
                Dashboard
              </Link>:
              <>
               <>
                {"  "}
                <Link to="/Add" 
              className="componentnav ">
                <Button
                  className="btnheader icon"
                  
                  variant="primary"
                  onClick={() => {
                   
                  }}
                >
                  {" "}
                  <AddCircleOutlineOutlinedIcon />
                  Product
                </Button>
              </Link>
                
              </>
              <Link to="/Dashboard" className="componentnav ">
              Dashboard
              </Link> </>}
              
              
              <Link to="/Cart">
                <button className="ShoppingIcon componentnav">
                  <Badge badgeContent={cartL} max={9} color="info">
                    <ShoppingCartOutlinedIcon className="ShoppingIcon" />
                  </Badge>{" "}
                </button>{" "}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className=" loginAndRegistar">
              <Link to="/Dashboard" className="componentnav Dashboard">
                Dashboard
              </Link>

              <Link to="/Cart">
                <button className="ShoppingIcon">
                  <Badge  badgeContent={cartL} max={9}>
                    <ShoppingCartOutlinedIcon className="ShoppingIcon"  />
                  </Badge>{" "}
                </button>{" "}
              </Link>
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
