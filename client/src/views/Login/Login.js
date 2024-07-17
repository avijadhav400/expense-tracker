import React, { useState } from "react";
import axios from "axios";
import {json, Link} from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email: email,
      password: password
    });
    if (response.data.success) {
      toast.success(response.data.message);

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))
      toast.loading("Redirecting to dashboard")
      setTimeout(() => {
        window.location.href = '/'
      }, 1500);
    }
    else{
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <h1 className="form-heading">Login</h1>
      <form className="form">
        <input 
        type="email" 
        placeholder="Enter Email" 
        className="user-input" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="user-input"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

        />

        <button type="button" className="auth-btn" onClick={login}>
          Login
        </button>
        <div style={{marginTop: '5px', marginLeft: '28px'}}>
        <span>Don't have account?&nbsp;&nbsp;&nbsp;</span>
        <Link to="/signup" style={{textDecoration: "none"}}>Signup</Link>
        </div>
      </form>
      <Toaster/>
    </div>
  );
}

export default Login;
