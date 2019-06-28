const bodybuilderModel = require("../../database/models/bodybuilder");
const helpers = require("../../helpers");
const db = require("../../configs");
const sequelize = require("sequelize");
const op = sequelize.Op;

const getAllBodybuilders = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const bodybuilders = await bodybuilderModel(db, DataTypes).findAll();

    return res.status(200).send({
      success: true,
      errorMessage: "",
      bodybuilders,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const searchBodybuilders = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const bodybuilders = await bodybuilderModel(db, DataTypes).findAll({
      name: {
        [op.startsWith]: req.body.name,
      },
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      bodybuilders,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

const getBodybuilder = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const bodybuilder = await bodybuilderModel(db, DataTypes).findOne({
      id: req.body.id_bodybuilder,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      bodybuilder,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  getAllBodybuilders,
  searchBodybuilders,
  getBodybuilder,
};
