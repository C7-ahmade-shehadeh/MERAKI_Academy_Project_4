import React,{useContext} from 'react'
import {Nav,Button} from 'react-bootstrap';
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from 'react-router-dom'
import { UserContext } from '../../App';
import './Navbar.css'
const Navbar = () => {
  const token=localStorage.getItem('token')
  const {cartL}=useContext(UserContext)
  console.log('cartl: ',cartL);
  return (
    <div  className="Navbar">
    <Nav variant="tabs" className="Navbar">
    {!token ? <><Nav.Item>
        <Nav.Link href="/Register" className='componentnav'>Register</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link href="/Login"className='componentnav'>Login</Nav.Link>
      </Nav.Item></>
      :<>
      <div>
      <Nav.Item>
        <Nav.Link href="/Dashboard" className='componentnav'>Dashboard</Nav.Link>
      </Nav.Item>
      </div>
      <div>
      <Nav.Item>
        <Nav.Link href="/Cart"className='componentnav'><Button
            variant="outline-primary"
            
          >
            <Badge badgeContent={cartL} max={9} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>{" "}
          </Button>{" "}</Nav.Link>
      </Nav.Item></div></>}
      
      
      
    </Nav>
  </div>
  
  
  
  
  
  
  )
}

export default Navbar


//*<ListGroup horizontal>
  
{/* <ListGroup.Item> <Nav.Item>
<Nav.Link href="/Register" className='componentnav'>Register</Nav.Link>
</Nav.Item>
</ListGroup.Item>
<ListGroup.Item>
<Nav.Item>
<Nav.Link href="/Login"className='componentnav'>Login</Nav.Link>
</Nav.Item>
</ListGroup.Item> */}

// </ListGroup>