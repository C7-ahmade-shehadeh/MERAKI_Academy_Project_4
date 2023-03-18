import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import "./Dashboard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { UserContext } from "../../App";

import './Dashboard.css'
const Dashboard = () => {
  const { cartL ,setProducts,products} = useContext(UserContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // const [products, setProducts] = useState("");
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
        {/* <div className="list">
          
          <label className="label"> category:</label>
          <select
          className="select"
            name="category"
            id="category"
            onClick={(e) => {
              const searchItem = e.target.value;
              searchkind(searchItem);
            }}
          >
            <option value="clothes">clothes</option>
            <option value="watch">watch</option>
            <option value="Perfumes and makeup">Perfumes and makeup</option>
            <option value="Cap and scarf">Cap and scarf</option>
          </select>
</div> */}
{/* <div className="headarsearch">
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
              const searchval = e.target.value;
              setSearch2(searchval);
            }}
          ></input>
          </div>
        
        <div>
          {console.log(role)}
          {role == "UDMIN" ? (
            add ? (
              <>
                <Card className="text-center">
                  <Card.Header as="h5">
                  <label className="labelkind"> kind:</label>
                  <select
          className="selectadd"
            name="category"
            id="category"
            onClick={(e) => {
              const kind = e.target.value;
              setKind(kind);
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
              </>
            ) : (
              <>
                {"  "}
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
              </>
            )
          ) : (
            <></>
          )}
        </div> */}
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
                    {/* <img className="imgbody" src="Screenshot_2.png"></img> */}
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        console.log(product._id);
                        addTocart(product._id);
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>{" "}
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
                      <></>
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
