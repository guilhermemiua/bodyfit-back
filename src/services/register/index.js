const instructorModel = require("../../database/models/instructor");
const bodybuilderModel = require("../../database/models/bodybuilder");
const chargeModel = require("../../database/models/monthly_charge");
const helpers = require("../../helpers");
const db = require("../../configs");
const shortid = require("shortid");
const moment = require("moment");

const instructorRegister = async (req, res) => {
  try {
    const { DataTypes } = helpers;

    let instructor = await instructorModel(db, DataTypes).findOne({
      where: { cpf: req.body.cpf },
    });

    // Verify if exists
    if (instructor) {
      return res.status(404).send({
        success: false,
        errorMessage: "Instructor already exists",
      });
    }

    // Generate code access
    const code = shortid.generate();

    instructor = await instructorModel(db, DataTypes).create({
      code,
      name: req.body.name,
      cpf: req.body.cpf,
      birth_date: req.body.birth_date,
      cref: req.body.cref,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      instructor: instructor.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const instructorLogin = async (req, res) => {
  try {
    const { DataTypes } = helpers;
    const instructor = await instructorModel(db, DataTypes).findOne({
      where: { code: req.body.code },
    });

    // Verify if exists
    if (!instructor) {
      return res.status(404).send({
        success: false,
        errorMessage: "Instructor does not exists",
      });
    }

    return res.status(200).send({
      success: true,
      errorMessage: "",
      instructor: instructor,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const bodybuilderRegister = async (req, res) => {
  try {
    const { DataTypes } = helpers;
    let bodybuilder = await bodybuilderModel(db, DataTypes).findOne({
      where: { cpf: req.body.cpf },
    });

    // Verify if exists
    if (bodybuilder) {
      const charge = await chargeModel(db, DataTypes).findOne({
        where: {
          id_bodybuilder: bodybuilder.id,
        },
      });

      if (!charge) {
        const due_date = moment().add(1, "M");

        await chargeModel(db, DataTypes).create({
          due_date,
          id_bodybuilder: bodybuilder.id,
          value: req.body.value,
          paid: false,
        });

        return res.status(200).send({
          success: true,
          errorMessage: "",
          bodybuilder,
        });
      }

      return res.status(404).send({
        success: false,
        errorMessage: "Bodybuilder already exists",
      });
    }

    // Generate code access
    const code = shortid.generate();

    bodybuilder = await bodybuilderModel(db, DataTypes).create({
      code,
      name: req.body.name,
      cpf: req.body.cpf,
      birth_date: req.body.birth_date,
      status: req.body.status,
      last_paid: req.body.last_paid,
      phone: req.body.phone,
    });

    const due_date = moment().add(1, "M");

    await chargeModel(db, DataTypes).create({
      due_date,
      id_bodybuilder: bodybuilder.dataValues.id,
      value: req.body.value,
      paid: false,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      bodybuilder: bodybuilder.dataValues,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const bodybuilderLogin = async (req, res) => {
  try {
    const { DataTypes } = helpers;
    const bodybuilder = await bodybuilderModel(db, DataTypes).findOne({
      where: { code: req.body.code },
    });

    // Verify if exists
    if (!bodybuilder) {
      return res.status(404).send({
        success: false,
        errorMessage: "Bodybuilder does not exists",
      });
    }

    return res.status(200).send({
      success: true,
      errorMessage: "",
      bodybuilder: bodybuilder,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  instructorRegister,
  instructorLogin,
  bodybuilderRegister,
  bodybuilderLogin,
};
