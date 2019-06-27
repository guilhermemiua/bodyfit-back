const Sequelize = require("sequelize");
const db = require("dotenv").config();

const sequelize = new Sequelize(
  "postgres://ctdbszmjebvqdd:6787a9b35bb5bb95601443da3c74e788d27ddbb9f8d79d3dd1d06d696d7162fe@ec2-50-16-197-244.compute-1.amazonaws.com:5432/d77d8hdqfs4n5k",
  {
    protocol: "postgres",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    logging: true,
  }
);

module.exports = sequelize;
