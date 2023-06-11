import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const navigate = useNavigate();

  const register = () => {
    Axios.post("http://localhost:3001/register",
    {
      username: usernameReg,
      password: passwordReg,
    }).then((response)=> {
      console.log(response)
    })
  }
  const backToLogin = () => {
    navigate("/")

  }

  return (
      <div className='registration'>
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" onChange={(e) => {setUsernameReg(e.target.value)}} />
        <label>Password</label>
        <input type="password" onChange={(e) => {setPasswordReg(e.target.value)}}/>
        <button onClick={register}>Register</button>
        <p></p>
        <button onClick={backToLogin}>Back to Login</button>
      </div>
  )
}


export default Register









