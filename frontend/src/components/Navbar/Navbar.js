import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'

import './Navbar.css'
const Navbar = () => {
  const token=localStorage.getItem('token')
  console.log('token:nav',token);
  return (
    <div  className="Navbar">
    <Nav variant="tabs" className="Navbar">
    {!token ? <><Nav.Item>
        <Nav.Link href="/Register" className='componentnav'>Register</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link href="/Login"className='componentnav'>Login</Nav.Link>
      </Nav.Item></>:<><Nav.Item>
        <Nav.Link href="/Dashboard" className='componentnav'>Dashboard</Nav.Link>
      </Nav.Item></>}
      
      
      
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