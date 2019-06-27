const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  protocol: "postgres",
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
  logging: true,
});

module.exports = sequelize;
