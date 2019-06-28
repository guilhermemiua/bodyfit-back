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
      where: {
        name: {
          [op.startsWith]: req.body.name,
        },
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

const getInstructor = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const instructor = await instructorModel(db, DataTypes).findOne({
      where: {
        id: req.body.id_instructor,
      },
    });

    if (instructor) {
      return res.status(200).send({
        success: true,
        errorMessage: "",
        instructor,
      });
    } else {
      return res.status(404).send({
        success: false,
        errorMessage: "Instructor does not exist",
      });
    }
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
  getInstructor,
};
