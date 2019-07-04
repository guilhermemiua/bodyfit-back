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

      await db.query(
        'DELETE * FROM "bodyfit-bd"."exercise", "bodyfit-bd"."card" WHERE "card".id_bodybuilder = $1 AND "exercise".id = "card".id_exercise',
        {
          bind: [req.body.id_bodybuilder],
        }
      );
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
        name: req.body.name,
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
    const workout = await db.query(
      'SELECT * FROM "bodyfit-bd"."workout", "bodyfit-bd"."card", "bodyfit-bd"."exercise" WHERE "workout"."id_bodybuilder" = $1',
      {
        bind: [req.body.id_bodybuilder],
      }
    );

    return res.status(200).send({
      success: true,
      errorMessage: "",
      workout: workout[0],
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
