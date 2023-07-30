import React from "react";
import { Link,Outlet } from "react-router-dom";
import '../../App.css'
const Navbar = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item" >
              <Link className="nav-link" to="/profile">Profile</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Outlet/>
    </div>
  );
};

export default Navbar;