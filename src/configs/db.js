const Sequelize = require('sequelize')
const db = require('dotenv').config()

const sequelize = new Sequelize(
  'postgres://myxmmkkxnewiyw:17ee744542332462482d0c1661a86b06e5fc316da3abc6fcbff0fdd92197ea22@ec2-54-83-1-101.compute-1.amazonaws.com:5432/d9li6rn6045meh',
  {
    protocol: 'postgres',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    },
    logging: true
  }
)

module.exports = sequelize
