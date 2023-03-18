import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [City, setCity] = useState("");
  const [product, setProduct] = useState([]);
  const [age, setAge] = useState("");
  const [role, setRole] = useState("6403c3c67049f11dcbcf8705");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const [statusregister, setStatusregister] = useState('email alredy exist')
  const newUser = {
    email: email,
    password: password,
    firstName: firstname,
    lastName: lastname,
    age: age,
    City: City,
    phoneNumber: phoneNumber,
    product: product,
    role: role,
  };
  const handelRegister = () => {
    if ( password1 == password2) {
                 console.log('password1',password1);
             console.log('password2',password2);
                  setPassword(password1)
                }else{setStatusregister('passwords not same')}
    console.log('password',password);

    axios
      .post("http://localhost:5000/user/register", newUser)
      .then((result) => {
        console.log(result.data);
        setDone(true)
        setErr(false)

        
      })
      .catch((err) => {
        console.log(err.response.data);
        setDone(false)
        setErr(true)
        
      });
  };
  const handelRegistergoogel=(userObj)=>{
    
    const newUser = {
      email: userObj.email,
      password: userObj.aud,
      firstName: userObj.given_name,
      lastName:userObj.family_name,
      
      phoneNumber: userObj.iat,
      
      role: role,
    };
    console.log('newUser: ',newUser);
    axios
  .post("http://localhost:5000/user/register", newUser)
  .then((result) => {
    console.log(result.data);
    
    
  })
  .catch((err) => {
    console.log(err.response);
    // handelLogin()     
  });
  }
  return (
    <div className="Register">
      <p className="HR">Register</p>
      <Form className="registarform">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label >Email</Form.Label>
            <Form.Control
            className="lebelregistar"
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >Password</Form.Label>
            <Form.Control
            className="lebelregistar"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                console.log(e.target.value);
                setPassword1(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >password confirmation</Form.Label>
            <Form.Control
            className="lebelregistar"
              type="password"
              placeholder="Rewrite your Password"
              onChange={(e) => {
                console.log(e.target.value);

                setPassword2(e.target.value);

              }}
            />
          </Form.Group>
          {/*  */}
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label >firstName</Form.Label>
            <Form.Control
            className="lebelregistar"
              placeholder="First name"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </Col>
          <Col>
            <Form.Label >lastName</Form.Label>
            <Form.Control
            className="lebelregistar"
              placeholder="Last name"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId="formGridCity"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <Form.Label >City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridZip"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          >
            <Form.Label >age</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group
          className="lebelregistar"
            as={Col}
            
            controlId="formGridZip"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          >
            <Form.Label >phoneNumber</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
<div className="btnlogin">
        <Button variant="primary" onClick={handelRegister}>
          Submit
        </Button>
        </div>
        <div className="googel">
      <GoogleOAuthProvider 
      clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
        <GoogleLogin 
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    const token =credentialResponse.credential
    const userObj=jwtDecode(token)
    
    handelRegistergoogel(userObj)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  auto_select
/>

        </GoogleOAuthProvider>
        </div>
      </Form>
     
      {done ? <p className="done">Register Done go to <button onClick={(e) => {
         
         navigate("/Login");
       }}>login</button> </p> :<></> }
     
      {err ? <p className="faild">{statusregister}</p> :<></> }
    </div>
  );
};

export default Register;
