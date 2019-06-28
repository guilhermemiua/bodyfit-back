const Sequelize = require("sequelize");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    protocol: "postgres",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    logging: true,
  });
} else {
  module.exports = new Sequelize(process.env.DATABASE_URI, {
    protocol: "postgres",
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
    logging: true,
  });
}
