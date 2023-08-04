import React, { useContext } from "react";
import { fetchData } from "../../main";
import '../../App.css'
import UserContext from "../../context/userContext.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate=useNavigate();

  const {user, updateUser} = useContext(UserContext);

  const {username, password, email} = user;  

  const onChange = (e) => updateUser(e.target.name, e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/register", 
      {
       username,
       password,
       email
      }, 
      "POST")
    .then((data) => {
      if(data.success) {
        updateUser("authenticated",true);
        navigate("/profile");
        console.log(data)
      }else{
        alert(data.message)
      }
    })  
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <div className="register-form-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">User Email</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter User name"
            onChange={onChange}
            value={username}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter user mail"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={onChange}
            value={password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;