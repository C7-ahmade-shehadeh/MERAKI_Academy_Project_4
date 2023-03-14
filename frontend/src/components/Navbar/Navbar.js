import React, { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Navbar.css";
const Navbar = () => {
  const token = localStorage.getItem("token");
  const { cartL } = useContext(UserContext);
  console.log("cartl: ", cartL);
  return (
    <div>
      <div className="Navbar">
        <label className="logo">Al_BORENI_PRINTAR</label>
        <br></br>
        {token ? (
          <>
            <div className="loginAndRegistar">
              <Link to="/Register" className="componentnav ">
                Register
              </Link>

              <Link to="/Login" className="componentnav ">
                Login
              </Link>
              <Link to="/Dashboard" className="componentnav Dashboard">
                Dashboard
              </Link>

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
