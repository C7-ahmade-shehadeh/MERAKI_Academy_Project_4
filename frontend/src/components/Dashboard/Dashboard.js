import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "./Dashboard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { UserContext } from "../../App";

import './Dashboard.css'
const Dashboard = () => {
  const { cartL ,setProducts,products} = useContext(UserContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
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
  const [search2, setSearch2] = useState("");
  //? ======================================
  //todo function upDAteproduct
  const upDAteproduct = (_id) => {
    axios
      .put(`http://localhost:5000/product/delete/${_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //todo function AddTocart
  const addTocart = (Productid) => {
    console.log("Productid: ", Productid);
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
        console.log(products, res);
        setProducts(newarrproduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  //!==useEffect===
  useEffect(() => {
    console.log(token);
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
        
      </div>
      <div className="product">
        {products &&
          products.map((product, i) => {
            return (
              <div key={product._id}>
                <Card className="text-center card">
                  <Card.Header className="cardheader" as="h5">
                    {product.kind}
                  </Card.Header>
                  <Card.Body className="bodycard">
                    <Card.Title className="cardTitle">
                      {product.name}
                    </Card.Title>
                    <Card.Text  className="description">
                      {product.description}
                      <p > manu facturing year: {product.manufacturingyear}</p>
                      <p> price: {product.price}$</p>
                    </Card.Text>
                    
                    {" "}
                    {role == "UDMIN" ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          Deleteproduct(product._id);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                    ) : (
                      <Button
                      variant="outline-primary"
                      onClick={() => {
                        console.log(product._id);
                        addTocart(product._id);
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                    )}
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    delivery: {product.delivery}
                    {"  "}state: {product.state}
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

//**  <div >
/* <Link className="catagory" to={'/'}>T-Shitr</Link>
<Link className="catagory" to={'/'}>Jeans</Link>
<Link className="catagory" to={'/'}>Shoes</Link>
 <Link className="catagory" to={'/'}>Jacket</Link>



</div>*/
