import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserContext } from "../../App";
import "./Cart.css";
//!=====================

//!=============
const Cart = () => {
  const { setCartL } = useContext(UserContext);
  const [cart, setCart] = useState("");
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(false);
  const [amount_id, setAmount_id] = useState(1);
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
          console.log("_id: ", _id, "id:", elem._id);
          return _id !== elem._id;
        });
        console.log("in Deleteproduct:", newarrproduct);
        console.log(cart);
        console.log("res", res);
        setCart(newarrproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //todo function updateproductCart
  const updateproductCart = (_id, newamount) => {
    console.log("newamount:", newamount,'token',token);
    axios
      .put(
        `http://localhost:5000/cart/updat/${_id}`,
        { amount: newamount },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const newcart = cart.map((elem) => {
          console.log( 'elem.amount: ' , elem.amount ,' res.data.amount:', res.data.amount);
          if (elem._id == res.data._id) {
            elem.amount = res.data.amount;
          }
          return elem;
        });
        console.log("newcar: ", newcart);
        setCart(newcart);

        Total(newcart);
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
         Total(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);
  const Total = (cart) => {
    console.log('newcart:',cart);
    let Totalprice =
      cart &&
      cart.reduce((acc, elem) => {
        let price = parseInt(elem.product.price, 10) * elem.amount;

        console.log("price: ", price);

        return acc + price;
      }, 0);
    Totalprice = Totalprice + price;
    // console.log("Totalprice: ", Totalprice);
    setTotal(Totalprice);
    // return Totalprice
  };

  // console.log("cart.length", cart.length);
  setCartL(cart.length);
  return (
    <div>
      <div className="total">
        <p>Total : {total}$</p>
      </div>
      <div className="product">
        {cart.length > 0 ? (
          cart &&
          cart.map((elem, i) => {
            return (
              <Card key={elem.product._id} className="text-center cardcart">
                {/* <Card.Header>{elem.product.kind}</Card.Header> */}

                <Card.Body className="bodycardcart">
                  {/* <Card.Title>{elem.product.name}</Card.Title> */}
                  <Card.Text>
                    {elem.product.description}
                    {/* <p> manufacturingyear: {elem.product.manufacturingyear}</p> */}
                    <div className="price">
                      <button
                        className="btnprice"
                        onClick={() => {
                          const newamount = elem.amount + 1;

                          updateproductCart(elem._id, newamount);
                        }}
                      >
                        +
                      </button>
                      <p className="pPrice">
                        {" "}
                        price:{" "}
                        {parseInt(elem.product.price, 10) * elem.amount}
                        {/* {console.log('elem.amount: ',elem.amount)} */}
                        $
                      </p>
                      <button
                        className="btnprice"
                        onClick={() => {
                          if (elem.product.amount > 1) {
                            setAmount(true);

                            const newamount = elem.amount - 1;

                            updateproductCart(elem._id, newamount);
                          } else {
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                    <p>amount:{elem.amount}</p>
                  </Card.Text>
                  <Button variant="outline-success">buying</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      DeleteproductCart(elem._id);
                    }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </Card.Body>
                {/* <Card.Footer className="text-muted">
                  delivery: {elem.product.delivery} state: {elem.product.state}
                </Card.Footer> */}
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

// if (price) {
// }else{
//       let Totalprice=60
//       Totalprice =Totalprice+price
//       console.log('Totalprice: ',Totalprice);
//       // setTotal(Totalprice)
//       return Totalprice
//     }
