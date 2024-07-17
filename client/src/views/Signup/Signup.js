import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Signup.css";
import "../../../src/global.css";

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    dob: "",
  });

  const signup = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        dob: user.dob,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setUser({
        fullName: "",
        email: "",
        password: "",
        dob: "",
      });
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <h1 className="form-heading">User Registration</h1>
      <form className="form">
        <input
          type="text"
          placeholder="Enter Full Name"
          className="user-input"
          value={user.fullName}
          onChange={(e) => {
            setUser({ ...user, fullName: e.target.value });
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="user-input"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="user-input"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        <input
          type="date"
          placeholder="Enter Date of Birth"
          className="user-input"
          value={user.dob}
          onChange={(e) => {
            setUser({ ...user, dob: e.target.value });
          }}
        />

        <button type="button" className="auth-btn" onClick={signup}>
          Register
        </button>

        <div style={{ marginTop: "5px", marginLeft: "23px" }}>
          <span>Already have account?&nbsp;&nbsp;&nbsp;</span>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login Here
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Signup;
