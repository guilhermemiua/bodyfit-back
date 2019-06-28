const workoutModel = require("../../database/models/workout");
const cardModel = require("../../database/models/card");
const helpers = require("../../helpers");
const db = require("../../configs");

const createWorkout = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    // Verify if already exists workout
    let workout = await workoutModel(db, DataTypes).findOne({
      id_bodybuilder: req.body.id_bodybuilder,
    });

    if (workout) {
      workout = await workoutModel(db, DataTypes).update(
        {
          id_intensity: req.body.id_intensity,
          id_instructor: req.body.id_instructor,
        },
        {
          where: {
            id_bodybuilder: req.body.id_bodybuilder,
          },
        }
      );
    } else {
      workout = await workoutModel(db, DataTypes).create({
        id_intensity: req.body.id_intensity,
        id_instructor: req.body.id_instructor,
        id_bodybuilder: req.body.id_bodybuilder,
      });
    }

    req.body.cards.map(async card => {
      await cardModel(db, DataTypes).create({
        series: card.series,
        repetition: card.repetition,
        weight: card.weight,
        id_exercise: card.id_exercise,
        id_workout: workout.dataValues.id,
      });
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

const getWorkout = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    // Verify if already exists workout
    const workout = await workoutModel(db, DataTypes).findOne({
      id_bodybuilder: req.body.id_bodybuilder,
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      workout,
    });
  } catch (err) {
    return res.status(404).send({
      success: false,
      errorMessage: err,
    });
  }
};

module.exports = {
  createWorkout,
  getWorkout,
};
