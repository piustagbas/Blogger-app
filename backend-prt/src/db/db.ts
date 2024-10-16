// db.js

import { Sequelize } from 'sequelize';



// Create a new Sequelize instance for PostgreSQL connection
const sequelize = new Sequelize('blogging_db', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',  // Using PostgreSQL
});

export default sequelize;