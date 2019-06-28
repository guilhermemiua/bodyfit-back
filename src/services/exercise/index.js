const exerciseModel = require("../../database/models/exercise");
const helpers = require("../../helpers");
const db = require("../../configs");

const getAllExercises = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const exercises = await exerciseModel(db, DataTypes).findAll();

    return res.status(200).send({
      success: true,
      errorMessage: "",
      exercises,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  getAllExercises,
};
