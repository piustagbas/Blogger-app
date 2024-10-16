// models/BlogModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db';

 // Import the Sequelize instance

// Define the Blog model with Sequelize
const BlogModel = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  image: {
    type: DataTypes.STRING,
  },
  post: {
    type: DataTypes.TEXT,
  },
});

module.exports = BlogModel;
