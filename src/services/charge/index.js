const chargeModel = require("../../database/models/monthly_charge");
const helpers = require("../../helpers");
const db = require("../../configs");
const moment = require("moment");

const getAllCharges = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const charges = await db.query(
      `SELECT monthly_charge.id, monthly_charge.due_date, monthly_charge.value, monthly_charge.id_bodybuilder, monthly_charge.paid, bodybuilder.name FROM "bodyfit-bd"."monthly_charge", "bodyfit-bd"."bodybuilder" WHERE "bodybuilder"."id" = "monthly_charge"."id_bodybuilder" AND "monthly_charge"."paid" = $1`,
      {
        bind: [false],
      }
    );

    return res.status(200).send({
      success: true,
      errorMessage: "",
      charges: charges[0],
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
    const charge = await chargeModel(db, DataTypes).findByPk(
      req.body.id_charge
    );

    if (charge.dataValues.paid == true) {
      return res.status(404).send({
        success: false,
        errorMessage: "Charge already paid",
      });
    }

    await chargeModel(db, DataTypes).update(
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
      due_date: due_date,
      id_bodybuilder: charge.dataValues.id_bodybuilder,
      value: charge.dataValues.value,
      paid: false,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
    });
  } catch (err) {
    console.log(err);
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
