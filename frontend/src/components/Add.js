import React,{useState,useContext} from 'react'
import { Nav, Button,Card } from "react-bootstrap";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import axios from "axios";

const Add = () => {
    const [kind, setKind] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [delivery, setDelivery] = useState("");
    const [state, setState] = useState("");
    const [manufacturingyear, setManufacturingyear] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [search2, setSearch2] = useState("");
    const navigate = useNavigate();
    const {setProducts,products} = useContext(UserContext);
const token=localStorage.getItem('token')
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
        navigate("/Dashboard");

          })
          .catch((err) => {
            console.log(err);
          });
      };
  return (
    <div>
      <p></p>
<div>
        
         
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
              setKind(kind);
            }}
          >
             <option value="clothes"></option>         
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
        navigate("/Dashboard");
                       
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
                      
                      }}
                    >
                      {" "}
                      <AddCircleOutlineOutlinedIcon />
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            
             
         
            <></>
         
        </div>

    </div>
  )
}

export default Add