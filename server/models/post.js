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
    CREATE TABLE IF NOT EXISTS attachments (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      link VARCHAR(255) NOT NULL
    );    
    `;

    await client.query(createTableQuery);

    console.log('attachments table created successfully!');
  } catch (err) {
    console.error('Error creating the "users" table:', err);
  }
}

async function insertAttachment(email, link) {
  try {
    const client = await establishConnection();
    await createUsersTable();
    console.log("Data received in model",email,link)
    const insertQuery = 'INSERT INTO attachments (email, link) VALUES ($1, $2)';
    const values = [email, link];

    await client.query(insertQuery, values);

    return { success: true, message: `Attachement "${email}" inserted into the "users" table.` };
  } catch (err) {
    return { success: false, message: 'Error inserting user into the "attachments" table.', error: err.message };
  }
}


module.exports = { 
  insertAttachment
};

