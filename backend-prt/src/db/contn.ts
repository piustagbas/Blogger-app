// db.js
const { Client } = require('pg');

// Create a client instance
const client = new Client({
  user: 'postgres',    // e.g., 'postgres'
  host: 'localhost',   // e.g., 'localhost' or your database URL
  database: 'blogging_db', // e.g., 'blogging_db'
  password: '123456789',   // Your PostgreSQL password
  port: 5434,              // Port you're connecting to
});

async function check() {
    try {
      await client.connect();
  
      // Correct query with integer parameter
      const res = await client.query('SELECT * FROM blogs WHERE id = $1', [1]); // Pass the correct id
  
      console.log(res.rows[0]); // Logs the blog with id = 1
    } catch (err) {
      // Check if err is an instance of Error and log stack
      if (err instanceof Error) {
        console.error('Error executing query', err.stack);
      } else {
        console.error('Unknown error', err);
      }
    } finally {
      await client.end();
    }
  }
  

// Execute the function
check();

module.exports = client;
