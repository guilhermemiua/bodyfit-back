const chargeModel = require("../../database/models/monthly_charge");
const helpers = require("../../helpers");
const db = require("../../configs");
const moment = require("moment");

const getAllCharges = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const charges = await chargeModel(db, DataTypes).findAll({
      paid: false,
    });

    const month = moment().month();

    charges.forEach(charge => {
      console.log(charge);
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      charges,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  getAllCharges,
};
