const instructorModel = require("../../../database/models/instructor");
const helpers = require("../../../helpers");
const db = require("../../../configs");
const shortid = require("shortid");

const register = async (req, res) => {
  const { DataTypes } = helpers;
  const instructor = await instructorModel(db, DataTypes).findOne({
    where: { cpf: req.body.cpf },
  });

  // Verify if exists
  if (instructor) {
    return res.status(404).send({
      success: false,
      errorMessage: "Instructor already exists",
    });
  }

  try {
    // Generate code access
    const code = shortid.generate();

    await instructorModel(db, DataTypes).create({
      code,
      name: req.body.name,
      cpf: req.body.cpf,
      birth_date: req.body.birth_date,
      cref: req.body.cref,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      code,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const login = async (req, res) => {
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
};

module.exports = {
  register,
  login,
};
