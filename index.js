require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');

// const { Client } = require('pg');
// const rdsConfig = {
//   user: 'postgres',
//   host: 'test-postgres.cxxaxyljqayh.eu-north-1.rds.amazonaws.com',
//   database: 'test_db',
//   password: 'postgres123',
//   port: 5432,
// };

// const client = new Client(rdsConfig);


const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');

// client.connect();

app.use(express.json());

app.use(express.static(__dirname + "/client/build"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/client/build', 'index.html')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

app.use('/user', userRoutes);

app.use('/post', postRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

