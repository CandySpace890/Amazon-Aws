import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "../../App.css";
import Navbar from "./Navbar.js";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userid = user.email;
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();

  // Check if the current location matches the "profile" path
  const isProfilePage = location.pathname.includes('/profile');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("file value is ", selectedFile);
    console.log("Logged in email",user,userid)    
    const formData = new FormData();
    formData.append("email1", document.getElementById("email1").value);
    formData.append("email2", document.getElementById("email2").value);
    formData.append("email3", document.getElementById("email3").value);
    formData.append("email4", document.getElementById("email4").value);
    formData.append("email5", document.getElementById("email5").value);
    formData.append("file", selectedFile);
    formData.append("userid",userid);

    // Make a POST request to the /upload endpoint
    fetch("/post/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data", data);
        // Handle the response data here
        // You can display a success message or perform other actions based on the response
        // navigate("/profile");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error here
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
       {!isProfilePage && <Navbar />}
      <div className="register-form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
            <label htmlFor="email1">Email 1</label>
            <input
              type="text"
              id="email1"
              name="email1"
              className="form-control"
              placeholder="Enter email 1"
            />
          </div>
            <div className="form-group">
            <label htmlFor="email2">Email 2</label>
            <input
              type="text"
              id="email2"
              name="email2"
              className="form-control"
              placeholder="Enter email 2"
            />
          </div>
            <div className="form-group">
            <label htmlFor="email3">Email 3</label>
            <input
              type="text"
              id="email3"
              name="email3"
              className="form-control"
              placeholder="Enter email 3"
            />
          </div>
            <div className="form-group">
            <label htmlFor="email4">Email 4</label>
            <input
              type="text"
              id="email4"
              name="email4"
              className="form-control"
              placeholder="Enter email 4"
            />
          </div>
            <div className="form-group">
            <label htmlFor="email5">Email 5</label>
            <input
              type="text"
              id="email5"
              name="email5"
              className="form-control"
              placeholder="Enter email 5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </div>
      <br></br>
    </div>
  );
};

export default Profile;
