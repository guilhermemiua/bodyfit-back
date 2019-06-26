// const address = require('../database/models/address');
const db = require('../configs')

const create = async (req, res) => {
  const DataTypes = {
    STRING: String,
    INTEGER: Number,
    DOUBLE: Number
  }
  /*
  await address(db, DataTypes)
    .create({
      city: req.body.city,
      street: req.body.street,
      district: req.body.district,
      number: req.body.number,
    })
    .then(() => {
      res.json({
        success: true,
        errorMessage: '',
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        errorMessage: err,
      });
    });
    */
}

module.exports = {
  create
}
