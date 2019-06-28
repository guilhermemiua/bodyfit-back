const intensityModel = require("../../database/models/intensity");
const helpers = require("../../helpers");
const db = require("../../configs");

const getAllIntensities = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const intensities = await intensityModel(db, DataTypes).findAll({});

    return res.status(200).send({
      success: true,
      errorMessage: "",
      intensities,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const populateIntensity = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    await intensityModel(db, DataTypes).create({
      name: "Iniciante",
    });

    await intensityModel(db, DataTypes).create({
      name: "Intermediário",
    });

    await intensityModel(db, DataTypes).create({
      name: "Avançado",
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
  getAllIntensities,
  populateIntensity,
};
