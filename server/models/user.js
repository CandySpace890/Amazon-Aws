async function establishConnection() {
  const { Client } = require('pg');
  const rdsConfig = {
    user: 'postgres',
    host: 'test-postgres.cxxaxyljqayh.eu-north-1.rds.amazonaws.com',
    database: 'test_db',
    password: 'postgres123',
    port: 5432,
  };

  const client = new Client(rdsConfig);
  await client.connect();
  return client;
}

async function createUsersTable() {
  try {
    const client = await establishConnection();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    );    
    `;

    await client.query(createTableQuery);

    console.log('Users table created successfully!');
  } catch (err) {
    console.error('Error creating the "users" table:', err);
  }
}

async function insertUser(email, username, password) {
  try {
    const client = await establishConnection();
    await createUsersTable();
    const check=await checkIfUserExists(email);
    console.log("check data received is ",check)
    if (check.success==true){
      return { success: false, message: 'user already exists', error: err.message };
    }
    const insertQuery = 'INSERT INTO users (email, username, password) VALUES ($1, $2, $3)';
    const values = [email, username, password];

    await client.query(insertQuery, values);

    return { success: true, message: `User "${username}" inserted into the "users" table.` };
  } catch (err) {
    return { success: false, message: 'Error inserting user into the "users" table.', error: err.message };
  }
}

async function getAllUsers() {
  try {
    const client = await establishConnection();

    const selectQuery = 'SELECT * FROM users';

    const queryResult = await client.query(selectQuery);
    const users = queryResult.rows;

    return { success: true, users };
  } catch (err) {
    return { success: false, message: 'Error fetching users from the "users" table.', error: err.message };
  }
}

async function userLogin(email, password) {
  try {
    const client = await establishConnection();

    const findUserQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [email, password];

    const queryResult = await client.query(findUserQuery, values);
    const user = queryResult.rows[0];

    if (user) {
      return { success: true, message: `User "${user.username}" logged in successfully.` };
    } else {
      return { success: false, message: 'Invalid email or password. Login failed.' };
    }
  } catch (err) {
    return { success: false, message: 'Error during user login.', error: err.message };
  }
}
async function checkIfUserExists(email) {
  try {
    const client = await establishConnection();
    console.log("Data got",email,name,password);
    const selectQuery = 'SELECT * FROM users WHERE email = $1';
    const queryParams = [email];

    const queryResult = await client.query(selectQuery, queryParams);
    console.log("Query result",queryResult.rows);
    const userExists = queryResult.rows.length > 0;
    if (queryResult.rows.length ==0){
    return { success: false, message: 'user doesnt exist' };
    }
    return { success: true, userExists };
  } catch (err) {
    return { success: false, message: 'Error checking user existence in the "users" table.', error: err.message };
  }
}


module.exports = { 
  insertUser,
  getAllUsers,
  userLogin 
};

