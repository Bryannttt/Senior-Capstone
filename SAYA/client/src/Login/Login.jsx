import React, { useState } from 'react';
import Axios from 'axios';
import logo from '../assets/saya-logo.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();
  const { setAuthInfo } = useContext(AuthContext);

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(alert("Incorrect email or password!"));
      } else {
        setAuthInfo({ isAuthenticated: true, userId: response.data[0].id });
        navigate("/Dashboard");
      }
    });
  };

  return (
    <div className="backgroundLogin">
      <div className="card">
        <div className="container">

          <img src={logo} alt="Logo" className="logo" />
          {/* <a href="/Register">Register</a> */}

          <label className="portal">SAYA.life Portal</label>
          <label className="title">Welcome to SAYA.life</label>
          <label className="enter">Enter your email and password below</label>

          <div className="email">
            <label name="Email" className="emailText">EMAIL</label>
            <input type='text' placeholder='Email Address' className="emailIn"
              onChange={(e) => { setUsername(e.target.value) }} />
          </div>

          <div className="pass">
            <label name="password" className="password">PASSWORD</label>
            <input type="password" placeholder='Password' className="passIn"
              onChange={(e) => { setPassword(e.target.value) }} />
          </div>

          <button onClick={ login } className="loginButton">Log In</button>

          <div>
            <Link to="/ForgotPassword" className='forgot'>Forgot Password</Link>
          </div>

        </div>
      </div>
      <h1> {loginStatus}</h1>
    </div>
  )
};

export default Login;
