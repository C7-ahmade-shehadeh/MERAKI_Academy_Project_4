import React, { useState,useContext } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import Carousel from 'react-bootstrap/Carousel';
import { UserContext } from "../../App";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const user = { email: email, password: password };
  const [userObj, setUserObj] = useState({});
  const { photo, setPhoto,setEmaleName} = useContext(UserContext);
 
  const handelLogin = () => {
    if(password ==''||email ==''){
      setErr(true);
      if(password =='' && email ==''){
        setLoginError('please enter your email and password')
      }
      else if (password =='') {
        setLoginError('please enter your password')
      } else {
        setLoginError('please enter your email')
      }
     }
   else{  axios
      .post("http://localhost:5000/user/login", user)
      .then((result) => {
        const role = result.data.role.role;
        const token = result.data.token;

        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        navigate("/Dashboard");
        setDone(true);
      })
      .catch((err) => {

        setErr(true);
      });}
  };
  const handelLogingoogel = (userObj) => {
  const user = { email: userObj.email, password: userObj.aud };

    axios
      .post("http://localhost:5000/user/login", user)
      .then((result) => {
        console.log(result.data.role.role);
        const role = result.data.role.role;
        const token = result.data.token;

        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        console.log("role: ", role);
        {role ==  'USER' ? navigate("/Dashtest"):
        navigate("/Dashboard")}
        setDone(true);
      })
      .catch((err) => {
        console.log("err 26 : ", err);

        setErr(true);
      });
  };

  return (
    // <Container>
      <div className="Login">
        
      <Form className="loginform">
        <Row>
          <div>
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
          </div>
          <div>
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
          </div>
        </Row>
        <div className="btnlogin">
        <Button variant="primary" onClick={handelLogin}>
          Login
        </Button>
        </div>
        <div className="googel">
        <GoogleOAuthProvider clientId="623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              const token = credentialResponse.credential;
              const userObj = jwtDecode(token);
              setPhoto(userObj.picture)
              setEmaleName(userObj.name)
              
              console.log('userObj: ',userObj);
              handelLogingoogel(userObj);

             
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            auto_select
          />
        </GoogleOAuthProvider>
</div>
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

        {err ? <p className="faild">{loginError}</p> : <></>}
      </Form>
      <Carousel className="slider">
      <Carousel.Item>
        <img
          className="d-block w-100 imgslidar"
         src=" Screenshot_2.png"       alt="First slide"
        />
        <Carousel.Caption>
              <label className="labelslider">Connect with us:</label>
        <div className="sliderTitle">
            <form>
<ul>
<li><a href="https://www.facebook.com/ahmad.boreni.98"><FacebookOutlinedIcon/> Ahmad Emad</a> </li>
<br></br>
<li><a href="https://www.instagram.com/ahmad_boreni98/?fbclid=IwAR0Em89Y84qvlZmRbIoqYdVMnHEvGbq-Z-1KrzWoLCwXPEHXH4DkzckfGCc"> <InstagramIcon className="instgram"/>ahmad_boreni98</a> </li>
<br></br>

<li><a href="https://twitter.com/AhmadBoreni98?t=jrcme29gCPAXRShndZT2MQ&s=09&fbclid=IwAR0odFH_FIdV0z9Q2VOX9KlOlRPzJoxX0vQJDw_1z38KcttnawId3wMscoc"> <TwitterIcon/>@AhmadBoreni98</a> </li>

</ul>
</form>
          <p className="sliderdis"></p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgslidar2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfypI4bPS-CveOMVLZr2glX2JljQ44RFyDFQ&usqp=CAU"
          alt="Second slide"
        />

        <Carousel.Caption>
         
          <p className="sliderTitle2">The finest types of clothes and the best prices.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imgslidar2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKdTlEYEcvYZFDtLlxvbQtIXMG6wuYP3Zt2g&usqp=CAU"
          alt="Third slide"
        />

        <Carousel.Caption>
         
          <p className="sliderTitle4">
           50% sale</p> 
           <br></br>
           <p className="sliderTitle3">of watches</p>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};
{/* </Container>
{/* //623758713896-qs98f7ph84a1pgflgvg84up6i825a8mv.apps.googleusercontent.com Client ID */}
        {/* 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 Client secret */}



export default Login;
