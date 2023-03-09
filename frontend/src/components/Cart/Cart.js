import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserContext } from "../../App";
//!=====================

//!=============
const Cart = () => {
 const {setCartL}=useContext(UserContext)
  const [cart, setCart] = useState("");
  const token = localStorage.getItem("token");
  //todo function DeleteproductCart
  const DeleteproductCart = (_id) => {
    console.log("id:", _id);
    axios
      .delete(`http://localhost:5000/cart/delete/${_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newarrproduct = cart.filter((elem) => {
          console.log("_id: ", _id, "id:", elem.product._id);
          return _id !== elem.product._id;
        });
        console.log("in Deleteproduct:", newarrproduct);
        console.log(cart);
        console.log('res',res);
        setCart(newarrproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //todo function getcart

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("data", res.data);
        setCart(res.data);
        console.log("cart", cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
let sumprice=0
console.log('cart.length',cart.length);
setCartL(cart.length)
  return (
    <div>
      <div className="total"><p>Toltal : {sumprice}$</p></div>
      <div className="product">
        {console.log("cart", cart)}

        {cart.length > 0 ? (
          cart &&
          cart.map((elem) => {
           
          let price =parseInt( elem.product.price,10);
          sumprice+=price
          console.log('sumprice:',sumprice);
            return (
              <Card key={elem.product._id} className="text-center">
                <Card.Header>{elem.product.kind}</Card.Header>
                <Card.Body className="bodycard">
                  <Card.Title>{elem.product.name}</Card.Title>
                  <Card.Text>
                    {elem.product.description}
                    <p> manufacturingyear: {elem.product.manufacturingyear}</p>
                    <p> price: {elem.product.price}$</p>
                    
                  </Card.Text>
                  <Button variant="outline-primary">buying</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      DeleteproductCart(elem.product._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  delivery: {elem.product.delivery} state: {elem.product.state}
                </Card.Footer>
                <Card.Img
                  variant="bottom"
                  src={elem.product.img}
                  className="imgcard"
                />
              </Card>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;

// setKind(elem.product.kind);
//             setName(elem.product.name
//               );
//             setPrice(elem.product.price);
//             setDelivery(elem.product.delivery);
//             setState(elem.product.state
//               );
//             setManufacturingyear(elem.product.manufacturingyear
//               );
//             setDescription(elem.product.description);
//             setImg(elem.product.img);
