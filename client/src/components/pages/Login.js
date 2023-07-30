import React, { useState,useContext } from "react";
import { fetchData } from "../../main";
import '../../App.css'
import UserContext from "../../context/userContext.js";
import { useNavigate } from "react-router-dom";

import '../../App.css'

const LoginForm = () => {
  
  const navigate=useNavigate();

  const {user, updateUser} = useContext(UserContext);

  const {email, password} = user; 
  
  
  const onChange = (e) => updateUser(e.target.name, e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    // const userid=username
    fetchData("/user/login", 
      {
        email,
       password
      }, 
      "POST")
    .then((data) => {
      if(data.success) {
        console.log("From api",data)
        updateUser("authenticated",true)
        navigate("/profile");
      }
    })  
    .catch((error) => {
      console.log(error)
    })

  }


  return (
    <div className="register-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter User email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Enter Password"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;