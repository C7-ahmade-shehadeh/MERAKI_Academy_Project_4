import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Button,Card} from 'react-bootstrap';
import './Dashboard.css' 
const Dashboard = () => {
    const token=localStorage.getItem('token')
    const [products, setProducts] = useState('')
const [userId, setUserId] = useState('')
//todo function Deleteproduct
const Deleteproduct=(_id)=>{
    axios.delete(`http://localhost:5000/product/delete/${_id}`
        ,{headers: {
            authorization: `Bearer ${token}`,},})
        .then((res) => {
            const newarrproduct=products.filter(product =>{
                console.log('_id: ',_id,'id:',product._id);
                return _id !== product._id
            })
            console.log('in Deleteproduct:' ,newarrproduct);
            console.log(products);                       setProducts(newarrproduct)


        }).catch(err =>{
            console.log(err);
        })
}
//!==useEffect===
    useEffect(() => {
        console.log("token",token);
        axios.get(`http://localhost:5000/product`
        ,{headers: {
            authorization: `Bearer ${token}`,},})
        .then((res) => {
            console.log(res.data.result);
            setUserId(res.data.userId)
            setProducts(res.data.result);
            console.log('products',products);
        }).catch(err =>{
            console.log(err);
        })
      }, []);
  return (
    <div > 
        <div className='headerDashbord'>
        <h1>Dashboard</h1>
        <Button variant="success">Add Product </Button>
        
        
        </div>
    <div className='product'>
     {products && products .map((product,i)=>{
        return(
            <div key={product._id} >
       <Card className="text-center">
      <Card.Header as="h5">{product.kind}</Card.Header>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
        {product.description}        
        <p> manufacturingyear: {product.manufacturingyear}</p>
        <p> price: {product.price}</p>
        
        </Card.Text>
        <Button variant="primary">add to cart</Button>
        <Button variant="danger" onClick={()=>{
            console.log('in 54');
            Deleteproduct(product._id)
        }} >Delete</Button>
      </Card.Body>
      <Card.Footer className="text-muted">delivery: {product.delivery} state: {product.state}</Card.Footer>
      <Card.Img variant="bottom" src={product.img} />
    </Card>
        </div>
        )
    })}
    </div>

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default Dashboard