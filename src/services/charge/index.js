const chargeModel = require("../../database/models/monthly_charge");
const helpers = require("../../helpers");
const db = require("../../configs");
const moment = require("moment");

const getAllCharges = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const charges = await chargeModel(db, DataTypes).findAll({
      where: {
        paid: false,
      },
    });

    const now = moment();

    charges.forEach(charge => {
      return (charge.isDelayed = now >= charge.due_date ? true : false);
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

const payCharge = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const charge = await chargeModel(db, DataTypes).update(
      {
        paid: true,
      },
      {
        where: {
          id: req.body.id_charge,
        },
      }
    );

    const due_date = moment(charge.dataValues.due_date).add(1, "M");

    await chargeModel(db, DataTypes).create({
      due_date,
      id_bodybuilder: charge.dataValues.id_bodybuilder,
      value: charge.dataValues.value,
      paid: false,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
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
  payCharge,
};
