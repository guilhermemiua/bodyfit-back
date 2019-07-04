const workoutModel = require("../../database/models/workout");
const bodybuilderModel = require("../../database/models/bodybuilder");
const cardModel = require("../../database/models/card");
const exerciseModel = require("../../database/models/exercise");
const helpers = require("../../helpers");
const db = require("../../configs");

const createWorkout = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    const bodybuilder = await bodybuilderModel(db, DataTypes).findOne({
      where: {
        id: req.body.id_bodybuilder,
      },
    });

    if (!bodybuilder) {
      return res.status(404).send({
        success: false,
        errorMessage: "Bodybuilder not found",
      });
    }

    // Verify if already exists workout
    let workout = await workoutModel(db, DataTypes).findOne({
      where: {
        id_bodybuilder: req.body.id_bodybuilder,
      },
    });

    if (workout) {
      await workoutModel(db, DataTypes).update(
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

      const cards = await cardModel(db, DataTypes).findAll({
        where: {
          id_workout: workout.dataValues.id,
        },
      });

      await cards.map(async card => {
        await cardModel(db, DataTypes).destroy({
          where: {
            id: card.dataValues.id,
          },
        });
        await exerciseModel(db, DataTypes).destroy({
          where: {
            id: card.dataValues.id_exercise,
          },
        });
      });
    } else {
      await workoutModel(db, DataTypes).create({
        id_intensity: req.body.id_intensity,
        id_instructor: req.body.id_instructor,
        id_bodybuilder: req.body.id_bodybuilder,
      });
    }

    workout = await workoutModel(db, DataTypes).findOne({
      where: {
        id_bodybuilder: req.body.id_bodybuilder,
      },
    });

    let exercise = "";

    await req.body.cards.map(async card => {
      exercise = await exerciseModel(db, DataTypes).create({
        name: card.name,
      });

      await cardModel(db, DataTypes).create({
        series: card.series,
        repetition: card.repetition,
        weight: card.weight,
        id_exercise: exercise.dataValues.id,
        id_workout: workout.dataValues.id,
      });
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

const getWorkout = async (req, res) => {
  const { DataTypes } = helpers;

  try {
    // Verify if already exists workout
    const workout = await workoutModel(db, DataTypes).findOne({
      where: {
        id_bodybuilder: req.body.id_bodybuilder,
      },
    });

    const cards = await cardModel(db, DataTypes).findAll({
      where: {
        id_workout: workout.id,
      },
    });

    return res.status(200).send({
      success: true,
      errorMessage: "",
      workout: cards,
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
