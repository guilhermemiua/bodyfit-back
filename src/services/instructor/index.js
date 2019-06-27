const instructorModel = require("../../database/models/instructor");
const helpers = require("../../helpers");
const db = require("../../configs");

const getAllInstructors = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const instructors = await instructorModel(db, DataTypes).findAll();

    return res.status(200).send({
      success: true,
      errorMessage: "",
      instructors,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const searchInstructors = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const instructors = await instructorModel(db, DataTypes).findAll({
      name: {
        [op.startsWith]: req.body.name,
      },
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      instructors,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  getAllInstructors,
  searchInstructors,
};
