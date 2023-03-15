import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import "./Login.css";
import jwtDecode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const user = { email: email, password: password };
 const [userObj, setUserObj] = useState({})
  const handelLogin = () => {
    
    axios
      .post("http://localhost:5000/user/login",
       user)
      .then((result) => {
        console.log(result.data.role.role);
        const role = result.data.role.role
        const token =result.data.token
       
        localStorage.setItem('role',role)
        localStorage.setItem('token',token)
        navigate("/Dashboard")
        setDone(true);
      })
      .catch((err) => {
        console.log("err 26 : ", err);

        setErr(true);
      });
  };
  return (
    <div className="Login">
      <p className="hl">login</p>
      {userObj &&
    <div>
      <img src={userObj.picture}></img>
      <p>{userObj.name}</p>
    </div>}
      <Form>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formGroupEmail">
            <Col sm={3} className="my-1" />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        
        
{/* //623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com Client ID */}
{/* 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 Client secret */}
        <Button variant="primary" onClick={handelLogin}>
          Submit
        </Button>
        <GoogleOAuthProvider clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    const token =credentialResponse.credential
    localStorage.setItem('token',token)
    const userObj=jwtDecode(token)
    console.log(userObj);
    setUserObj(userObj)
    
    // navigate("/Dashboard")
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  auto_select
/>

        </GoogleOAuthProvider>
        
        {done ? (
          <p className="done">
            Login Done go to{" "}
            <button
              onClick={(e) => {
                navigate("/Dashboard");
              }}
            >
              Dashboard
            </button>{" "}
          </p>
        ) : (
          <></>
        )}

        {err ? <p className="faild">{"Login faild"}</p> : <></>}
      </Form>
    </div>
  );
};

export default Login;
