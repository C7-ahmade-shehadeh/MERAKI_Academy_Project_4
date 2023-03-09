import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "./Dashboard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState("");
  const [userId, setUserId] = useState("");
  const [add, setAdd] = useState(false);
  //? == productSchema ======================
  const [kind, setKind] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState("");
  const [state, setState] = useState("");
  const [manufacturingyear, setManufacturingyear] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  //? ======================================
  //!=====================

  const [kindc, setKindc] = useState("");
  const [namec, setNamec] = useState("");
  const [pricec, setPricec] = useState("");
  const [deliveryc, setDeliveryc] = useState("");
  const [statec, setStatec] = useState("");
  const [manufacturingyearc, setManufacturingyearc] = useState("");
  const [descriptionc, setDescriptionc] = useState("");
  const [imgc, setImgc] = useState("");
  //!=============
  //todo function getcart
  const getcart = () => {
    axios
      .get(`http://localhost:5000/cart/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("data", res.data);
        const cart = res.data;
        cart.map((elem) => {
          setKindc(elem.product.kind);
          setNamec(elem.product.name
            );
          setPricec(elem.product.price);
          setDeliveryc(elem.product.delivery);
          setStatec(elem.product.state
            );
          setManufacturingyearc(elem.product.manufacturingyear
            );
          setDescriptionc(elem.product.description);
          setImgc(elem.product.img);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //todo function AddTocart
  const addTocart = (Productid) => {
    console.log(Productid);
    axios
      .post(
        `http://localhost:5000/cart/add`,
        { product: Productid },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //todo function AddProduct
  const AddProduct = () => {
    console.log(token);
    const newproduct = {
      kind,
      name,
      price,
      delivery,
      state,
      manufacturingyear,
      description,
      img,
    };
    console.log("newproduct: ", newproduct);
    axios
      .post(`http://localhost:5000/product/add`, newproduct, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newarrproduct = [...products, newproduct];

        console.log(res);
        console.log("newarrproductsdsd:", newarrproduct);
        setProducts(newarrproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //todo function Deleteproduct
  const Deleteproduct = (_id) => {
    axios
      .delete(`http://localhost:5000/product/delete/${_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newarrproduct = products.filter((product) => {
          console.log("_id: ", _id, "id:", product._id);
          return _id !== product._id;
        });
        console.log("in Deleteproduct:", newarrproduct);
        console.log(products);
        setProducts(newarrproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //!==useEffect===
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserId(res.data.userId);
        setProducts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //?====Deleteproduct return ===========
  return (
    <div>
      <div className="headerDashbord">
        <div className="headardash">
          <h1>Dashboard</h1>
        </div>
        <div>
          <Button
            variant="outline-primary"
            onClick={() => {
              getcart();
            }}
          >
            <Badge badgeContent={10} max={9} color="primary">
              <ShoppingCartIcon color="action" />
            </Badge>{" "}
          </Button>{" "}
          {add ? (
            <>
              <Card className="text-center">
                <Card.Header as="h5">
                  <input
                    type={"text"}
                    placeholder="kind .."
                    onChange={(e) => {
                      setKind(e.target.value);
                    }}
                  ></input>
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
                  </Card.Title>
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
            </>
          ) : (
            <>
              {"  "}
              <Button
                className="btnheader"
                variant="success"
                onClick={() => {
                  setAdd(true);
                }}
              >
                {" "}
                <AddCircleOutlineOutlinedIcon />
                Product
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="product">
        {products &&
          products.map((product, i) => {
            return (
              <div key={product._id}>
                <Card className="text-center">
                  <Card.Header as="h5">{product.kind}</Card.Header>
                  <Card.Body className="bodycard">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description}
                      <p> manufacturingyear: {product.manufacturingyear}</p>
                      <p> price: {product.price}</p>
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        console.log(product._id);
                        addTocart(product._id);
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        Deleteproduct(product._id);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    delivery: {product.delivery} state: {product.state}
                  </Card.Footer>
                  <Card.Img
                    variant="bottom"
                    className="imgcard"
                    src={product.img}
                  />
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;

//{add ? (
//   <>
//   <Card className="text-center">
//     <Card.Header as="h5">
//       <input
//         type={"text"}
//         placeholder="kind .."
//         onChange={(e) => {
//           setKind(e.target.value);
//         }}
//       ></input>
//     </Card.Header>
//     <Card.Body>
//       <Card.Title>
//         <input
//           type={"text"}
//           placeholder="name .."
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         ></input>
//       </Card.Title>
//       <Card.Text>
//         <textarea
//           type={"text"}
//           placeholder="description .."
//           onChange={(e) => {
//             setDescription(e.target.value);
//           }}
//         ></textarea>
//         <p>
//           {" "}
//           <input
//             type={"text"}
//             placeholder="manufacturingyear .."
//             onChange={(e) => {
//               setManufacturingyear(e.target.value);
//             }}
//           ></input>
//         </p>
//         <p>
//           {" "}
//           <input
//             type={"text"}
//             placeholder="price .."
//             onChange={(e) => {
//               setPrice(e.target.value);
//             }}
//           ></input>
//         </p>
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <p>
//         {" "}
//         <input
//           type={"text"}
//           placeholder="delivery :yes/no"
//           onChange={(e) => {
//             setDelivery(e.target.value);
//           }}
//         ></input>
//       </p>{" "}
//       <p>
//         {" "}
//         <input
//           type={"text"}
//           placeholder="state:new/used"
//           onChange={(e) => {
//             setState(e.target.value);
//           }}
//         ></input>
//       </p>
//       <input
//         type="text"
//         placeholder="add imge"
//         onChange={(e) => {
//           setImg(e.target.value);
//         }}
//       ></input>
//       <br></br>
//       <Button
//         variant="warning"
//         onClick={() => {
//           setAdd(false);
//         }}
//       >
//         {" "}
//         <ArrowBackOutlinedIcon />
//         back
//       </Button>
//       {"    "}
//       <Button
//         variant="success"
//         onClick={() => {
//           AddProduct();
//           setAdd(false);
//         }}
//       >
//         {" "}
//         <AddCircleOutlineOutlinedIcon />
//       </Button>
//     </Card.Footer>
//   </Card>
// </>
// ) : (
// <>
//   {"  "}
//   <Button
//     className="btnheader"
//     variant="success"
//     onClick={() => {
//       setAdd(true);
//     }}
//   >
//     {" "}
//     <AddCircleOutlineOutlinedIcon />
//     Product
//   </Button>
// </>
// )}/