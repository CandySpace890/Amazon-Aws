// 1. import any needed libraries
const express = require("express");
const User = require('../models/user'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
  .post('/login', async (req, res) => {
    try {
      const user = await User.userLogin(req.body.email, req.body.password);
      console.log(user)
      res.send({...user, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/register', async (req, res) => {
    try {
      console.log("Recevived the req")
      const user = await User.insertUser(req.body.email,req.body.username, req.body.password);
      res.send({...user, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

// 3. export router for use in index.js
module.exports = router;